import React from 'react'
import ReactDOM from 'react-dom'
import createBrowserHistory from 'history/lib/createBrowserHistory'
import { useRouterHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import { loadCounter } from './actions/counterActions'
import {loadCourses} from './actions/courseActions'
import {loadAuthors} from './actions/authorActions'
import configureStore from './store/configureStore'
import Index from './index'
import layout from '../config/defaultLayout'
import routes from './routes'

// ========================================================
// Browser History Setup
// ========================================================
const browserHistory = useRouterHistory(createBrowserHistory)({
  basename: __BASENAME__
})

// ========================================================
// Store and History Instantiation
// ========================================================
// Create redux store and sync with react-router-redux. We have installed the
// react-router-redux reducer under the routerKey "router" in src/routes/index.js,
// so we need to provide a custom `selectLocationState` to inform
// react-router-redux of its location.
const initialState = window.___INITIAL_STATE__
const store = configureStore(initialState, browserHistory)
const history = syncHistoryWithStore(browserHistory, store, {
  selectLocationState: (state) => state.router
})

store.dispatch(loadCounter())
store.dispatch(loadCourses())
store.dispatch(loadAuthors())

// ========================================================
// Developer Tools Setup
// ========================================================
if (0 && __DEBUG__) {
  if (window.devToolsExtension) {
    window.devToolsExtension.open()
  }
}

// ========================================================
// Render Setup
// ========================================================
const MOUNT_NODE = document.getElementById('root')

let render = (routerKey = null) => {
  ReactDOM.render(
    <Index
      store={store}
      history={history}
      routes={routes}
      routerKey={routerKey}
      layout={{...layout, ...(window.___LAYOUT__ || {})}}
    />,
    MOUNT_NODE
  )
}

// Enable HMR and catch runtime errors in RedBox
// This code is excluded from production bundle
if (__DEV__ && module.hot) {
  const renderApp = render
  const renderError = (error) => {
    const RedBox = require('redbox-react').default

    ReactDOM.render(<RedBox error={error} />, MOUNT_NODE)
  }
  render = () => {
    try {
      renderApp(Math.random())
    } catch (error) {
      renderError(error)
    }
  }
  module.hot.accept(['./routes'], () => render())
}

// ========================================================
// Go!
// ========================================================
render()
