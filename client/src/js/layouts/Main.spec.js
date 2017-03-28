import React from 'react'
import { shallow } from 'enzyme'

import { actions } from '../store/reducers/analytics'
import ConnectedMain, { Main } from './Main'

describe('Main layout component', () => {
  describe('connected component', () => {
    const children = 'such children'
    let element

    beforeEach(() => {
      const store = {
        getState: () => ({}),
        dispatch: () => '',
        subscribe: () => ''
      }
      element = shallow(<ConnectedMain children={children} store={store}></ConnectedMain>)
    })

    it('should create a connected component', () => {
      expect(Object.keys(element.props())).toEqual(expect.arrayContaining([
        'children',
        'store',
        ...Object.keys(actions)
      ]))
    })
  })

  describe('#render', () => {
    const children = 'such children'
    let element
    let create

    beforeEach(() => {
      create = jest.fn()
      element = shallow(<Main children={children} create={create}></Main>)
    })

    it('should render it\'s children', () => {
      expect(element.text()).toBe(children)
    })

    it('should initalize the analytics script', () => {
      expect(create).toBeCalled()
    })
  })
})
