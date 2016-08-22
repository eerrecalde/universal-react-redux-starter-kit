import * as types from '../actions/actionTypes'
import initialState from './initialState'
export default function counterReducer (state = initialState.counter, action) {
  switch (action.type) {
    case types.COUNTER_INCREMENT_SUCCESS:
      return action.counter

    case types.COUNTER_INCREMENT_ONE:
      return state + 1

    case types.COUNTER_INCREMENT_DOUBLE:
      return state * 2

    case types.COUNTER_LOAD_SUCCESS:
      return action.counter

    case types.COUNTER_DOUBLE_SUCCESS:
      return action.counter

    default:
      return state
  }
}
