import { combineReducers } from 'redux'
import { routerReducer as router } from 'react-router-redux'
import counter from './counterReducer'
import courses from './courseReducer'
import authors from './authorReducer'
import ajaxCallsInProgress from './ajaxStatusReducer'

const makeRootReducer = (asyncReducers) => {
  return combineReducers({
    // Add sync reducers here
    courses, // : courses (we don't add it because it's ES6)
    authors,
    counter,
    router,
    ajaxCallsInProgress,
    ...asyncReducers
  })
}

export const injectReducer = (store, { key, reducer }) => {
  store.asyncReducers[key] = reducer
  store.replaceReducer(makeRootReducer(store.asyncReducers))
}

export default makeRootReducer
