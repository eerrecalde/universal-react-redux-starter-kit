import { combineReducers } from 'redux'
import { routerReducer as router } from 'react-router-redux'
import counter from './counterReducer'

const makeRootReducer = (asyncReducers) => {
  return combineReducers({
    // Add sync reducers here
    counter,
    router,
    ...asyncReducers
  })
}

export const injectReducer = (store, { key, reducer }) => {
  store.asyncReducers[key] = reducer
  store.replaceReducer(makeRootReducer(store.asyncReducers))
}

export default makeRootReducer
