import createActions from './actions'

describe('analytics actions', () => {
  const ANALYTICS_CODE = 'very-code'
  let ga
  let actions

  beforeEach(() => {
    ga = jest.fn()
    actions = createActions({ ga }, { env: { ANALYTICS_CODE } })
  })

  describe('#create', () => {
    let result

    beforeEach(() => {
      result = actions.create()
    })

    it('should call the ga create function', () => {
      expect(ga).toBeCalledWith('create', ANALYTICS_CODE, 'auto')
    })

    it('should return an empty action', () => {
      expect(result).toEqual({
        type: ''
      })
    })
  })
})
