import fs from 'fs'
import path from 'path'

import cors from 'koa-cors'
import debug from 'debug'
import etag from 'koa-etag'
import helmet from 'koa-helmet'
import Koa from 'koa'
import React from 'react'
import serve from 'koa-static'

import { renderToString } from 'react-dom/server'
import App from '../client/src/js/App'
import createHistory from 'history/createMemoryHistory'
import createStore from '../client/src/js/store'

const PORT = process.env.PORT || 300

const log = {
  info: debug('app'),
  error: debug('app:error')
}
const app = new Koa()
const isProd = process.env.NODE_ENV === 'production'
app.isProxy = isProd
app.use(cors())
app.use(helmet())
app.use(etag())

app.use(async (ctx, next) => {
  try {
    await next()
  } catch (error) {
    ctx.body = { message: error.message }
    ctx.status = error.status || 500
    log.error(ctx.status, error.message)
  }
})

app.use(async (ctx, next) => {
  if (!isProd) {
    return await next()
  }
  if (ctx.request.headers['x-forwarded-proto'] === 'https') {
    await next()
  } else {
    ctx.response.redirect(ctx.request.href.replace('http', 'https'))
  }
})

const distPath = path.join(__dirname, '../dist/client')
app.use(serve(distPath, {
  index: false,
  gzip: true
}))

const html = fs.readFileSync(path.join(distPath, 'index.html'), 'utf8')
app.use(async (ctx, next) => {
  try {
    const { store, history } = createStore(undefined, createHistory(ctx.request.url))
    const page = renderToString(<App store={store} history={history}></App>)
    ctx.body = html.replace('<div id="app"></div>', `<div id="app">${page}</div>`)
  } catch (error) {
    log.error(error)
    this.status = 500
    await next()
  }
})

app.use(async ctx => {
  if (ctx.status === 404) {
    ctx.path = '/index.html'
    await serve(distPath)(ctx)
  }
})

app.listen(PORT, () => log.info('🌎 listening on ::%s', PORT))
