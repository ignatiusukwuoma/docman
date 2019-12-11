import * as actionTypes from '../actions/actionTypes';
import initialState from '../store/initialState';

/**
 * Check if a success ation type is dispatched
 * @param {string} type
 * @returns {boolean}
 */
function actionTypeEndsInSuccess(type) {
  return type.substring(type.length - 8) === '_SUCCESS';
}

/**
 * Reducer for ajax calls
 * @param {number} [state=initialState.ajaxCallsInProgress]
 * @param {object} action
 * @returns {number}
 */
export default function ajaxStatusReducer(state = initialState
  .ajaxCallsInProgress, action) {
  if (action.type === actionTypes.BEGIN_AJAX_CALL) {
    return state + 1;
  } else if (action.type === actionTypes.AJAX_CALL_ERROR
  || actionTypeEndsInSuccess(action.type)) {
    if (state > 0) {
      return state - 1;
    }
    return state;
  }
  return state;
}
