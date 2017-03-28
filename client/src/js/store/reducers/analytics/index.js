import analyticsReducer from './reducer'
import createActions from './actions'

const _window = (typeof window === 'undefined') ? { ga: () => '' } : window
export const actions = createActions(_window, process)
export const reducer = analyticsReducer
