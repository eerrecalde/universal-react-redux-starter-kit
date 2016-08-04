import {createStore, compose, applyMiddleware} from 'redux'
import { routerMiddleware } from 'react-router-redux'
import makeRootReducer from '../reducers'
import thunk from 'redux-thunk'

export default function configureStore (initialState = {}, history) {
  // ======================================================
  // Middleware Configuration
  // ======================================================
  const middleware = [thunk, routerMiddleware(history)]

  // ======================================================
  // Store Enhancers
  // ======================================================
  const enhancers = []
  if (__DEBUG__ && typeof window !== 'undefined' && window) {
    const devToolsExtension = window.devToolsExtension
    if (typeof devToolsExtension === 'function') {
      enhancers.push(devToolsExtension())
    }
  }

  // ======================================================
  // Store Instantiation and HMR Setup
  // ======================================================
  const store = createStore(
    makeRootReducer(),
    initialState,
    compose(
      applyMiddleware(...middleware),
      ...enhancers
    )
  )
  store.asyncReducers = {}

  if (module.hot) {
    module.hot.accept('../reducers', () => {
      const reducers = require('../reducers')
      store.replaceReducer(reducers(store.asyncReducers))
    })
  }

  return store
}
