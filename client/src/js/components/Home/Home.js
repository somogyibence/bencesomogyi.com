import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import React from 'react'

import { actions } from '../../store/reducers/analytics'

export class Home extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      appType: 'website'
    }
  }

  render () {
    return (
      <section id="home">
        <header>
          <div id="photo"></div>
          <h1>
            Welcome to my ridiculously overcomplicated {this.state.appType}.
          </h1>
        </header>
        <article>
          You can check the source on <a rel="noopener" href="https://github.com/somogyibence/bencesomogyi.com" target="_blank">github</a>.
          PRs are welcome.
        </article>
      </section>
    )
  }
}

export default connect(null, dispatch => bindActionCreators(actions, dispatch))(Home)
