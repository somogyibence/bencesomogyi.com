import { createStore, combineReducers, compose, applyMiddleware } from 'redux'
import { routerReducer, routerMiddleware } from 'react-router-redux'
import createHistory from 'history/createBrowserHistory'
import debug from 'debug'

import reducers from './reducers'

const log = debug('client:store')

export default (initialState = {}, history = createHistory()) => {
  if (Object.keys(initialState).length) {
    log('initial state found: %s', JSON.stringify(initialState))
  }
  const reducer = combineReducers({
    ...reducers,
    routing: routerReducer
  })

  const middlewares = [
    applyMiddleware(routerMiddleware(history))
  ]
  if (typeof window !== 'undefined') {
    if (window.__REDUX_DEVTOOLS_EXTENSION__) {
      middlewares.push(window.__REDUX_DEVTOOLS_EXTENSION__())
    }
  }
  const store = createStore(reducer, initialState, compose(...middlewares))

  return {
    store,
    history
  }
}
