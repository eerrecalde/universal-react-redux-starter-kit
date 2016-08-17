import * as types from './actionTypes'
import counterApi from '../api/mockCounterApi'
import {beginAjaxCall, ajaxCallError} from './ajaxStatusActions'
export function loadCounterSucess (counter) {
  return { type: types.COUNTER_LOAD_SUCCESS, counter }
}

export function incrementCounterByOne (counter) {
  return { type: types.COUNTER_INCREMENT_ONE, counter }
}

export function incrementCounterByDouble (counter) {
  return { type: types.COUNTER_INCREMENT_DOUBLE, counter }
}

export function updateCounterSuccess (counter) {
  return { type: types.COUNTER_INCREMENT_SUCCESS, counter }
}

export function doubleAsyncSuccess (counter) {
  return { type: types.COUNTER_DOUBLE_SUCCESS, counter }
}

export function loadCounter () {
  return function (dispatch) {
    dispatch(beginAjaxCall())
    return counterApi.getCounter().then((loadedCounter) => {
      dispatch(loadCounterSucess(loadedCounter))
    }).catch((error) => {
      dispatch(ajaxCallError(error))
      // throw(error)
    })
  }
}

export function updateCounterInDB (counter) {
  return function (dispatch) {
    dispatch(beginAjaxCall())
    return counterApi.saveCounter(counter).then((savedCounter) => {
      dispatch(updateCounterSuccess(savedCounter))
    }).catch((error) => {
      dispatch(ajaxCallError(error))
      // throw(error)
    })
  }
}
