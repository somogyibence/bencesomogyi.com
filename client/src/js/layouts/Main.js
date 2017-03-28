import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import React from 'react'

import { actions } from '../store/reducers/analytics'

export class Main extends React.Component {
  constructor (props) {
    super(props)
    this.props.create()
  }

  render () {
    return (
      <div id="main-layout">
        {this.props.children}
      </div>
    )
  }
}

export default connect(null, dispatch => bindActionCreators(actions, dispatch))(Main)
