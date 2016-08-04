import React from 'react'
import {Route, IndexRoute} from 'react-router'
import App from './components/App'
import HomeView from './components/HomeView/HomeView'
import ManageCounter from './components/Counter/ManageCounter'
export default (
  <Route path='/' component={App}>
    <IndexRoute component={HomeView} />
    <Route path='counter' component={ManageCounter} />
  </Route>
)
