import createStore from './index'

describe('#createStore', () => {
  describe('if initial state is set', () => {
    const initialState = {
      analytics: {},
      routing: {
        location: '/wow'
      }
    }
    let store
    let history

    beforeEach(() => {
      const _store = createStore(initialState)
      store = _store.store
      history = _store.history
    })

    it('should create a history', () => {
      expect(history).toBeDefined()
    })

    it('should use the initial state', () => {
      expect(store.getState()).toEqual(initialState)
    })
  })

  describe('if initial state isn\'t set', () => {
    let store
    let history

    beforeEach(() => {
      const _store = createStore()
      store = _store.store
      history = _store.history
    })

    it('should create a history', () => {
      expect(history).toBeDefined()
    })

    it('should use the initial state', () => {
      expect(store.getState()).toEqual({
        analytics: {},
        routing: {
          location: null
        }
      })
    })
  })
})
