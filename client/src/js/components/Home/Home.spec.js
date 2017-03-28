import React from 'react'
import { shallow } from 'enzyme'

import { actions } from '../../store/reducers/analytics'
import ConnectedHome, { Home } from './Home'

describe('Home component', () => {
  describe('connected component', () => {
    let element

    beforeEach(() => {
      const store = {
        getState: () => ({}),
        dispatch: () => '',
        subscribe: () => ''
      }
      element = shallow(<ConnectedHome store={store}></ConnectedHome>)
    })

    it('should create a connected component', () => {
      expect(Object.keys(element.props())).toEqual(expect.arrayContaining([
        'store',
        ...Object.keys(actions)
      ]))
    })
  })

  describe('#render', () => {
    let element

    beforeEach(() => {
      element = shallow(<Home></Home>)
    })

    it('should render a section', () => {
      expect(element.find('section').length).toBe(1)
    })

    it('should render a header', () => {
      expect(element.find('section#home').find('header').length).toBe(1)
    })

    it('should render a greeting', () => {
      expect(element.find('section > header > h1').text())
        .toBe('Welcome to my ridiculously overcomplicated website.')
    })
  })
})
