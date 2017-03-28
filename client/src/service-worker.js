import debug from 'debug'

const log = {
  info: debug('worker:info'),
  error: debug('worker:error')
}

const { env: { VERSION } } = process

self.addEventListener('install', event => {
  log.info('worker %s installed', VERSION)
})

const deleteCaches = keys => keys.map(key => caches.delete(key))

self.addEventListener('activate', event => {
  log.info('worker %s activated', VERSION)
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(deleteCaches(keys)))
      .catch(log.error)
  )
})

self.addEventListener('fetch', event => {
  let cacheDidMatch = false

  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (!response) {
          return fetch(event.request)
        }
        cacheDidMatch = true
        return response
      })
      .then(response => {
        if (cacheDidMatch) {
          return response
        }
        const clone = response.clone()
        caches.open(VERSION)
          .then(cache => cache.put(event.request.url, clone))
          .catch(log.error)
        return response
      })
      .catch(log.error)
  )
})
