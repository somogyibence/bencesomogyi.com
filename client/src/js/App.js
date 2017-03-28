import { ConnectedRouter } from 'react-router-redux'
import { Provider } from 'react-redux'
import { Route } from 'react-router'
import React, { PropTypes } from 'react'

import * as routes from './routes'
import MainLayout from './layouts/Main'

class App extends React.Component {
  _createRouteComponents () {
    return Object.keys(routes)
      .map(route => routes[route])
      .map(({ name, path, component }) => (
        <Route key={name} path={path} component={component} />
      ))
  }

  render () {
    return (
      <Provider store={this.props.store}>
        <ConnectedRouter history={this.props.history}>
          <MainLayout children={this._createRouteComponents()}></MainLayout>
        </ConnectedRouter>
      </Provider>
    )
  }
}

App.propTypes = {
  store: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
}

export default App
