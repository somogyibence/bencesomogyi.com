import './dependencies'

import { render } from 'react-dom'
import React from 'react'
import debug from 'debug'

import App from './App'
import createStore from './store'

const { store, history } = createStore(window.__INITIAL_STATE__)

render(<App store={store} history={history}></App>, document.getElementById('app'))

if (process.env.NODE_ENV === 'production' && 'serviceWorker' in navigator && navigator.onLine) {
  navigator.serviceWorker
    .register('/service-worker.js')
    .then(() => debug('client')('service worker registered'))
}
