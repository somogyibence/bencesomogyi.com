import reducer from './reducer'

describe('analytics reducer', () => {
  it('should only have an initial state', () => {
    expect(reducer()).toEqual({})
  })
})
