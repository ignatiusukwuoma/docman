import * as actionTypes from '../actions/actionTypes';
import initialState from '../store/initialState';

function actionTypeEndsInSuccess(type) {
  return type.substring(type.length - 8) === '_SUCCESS';
}

export default function ajaxStatusReducer(state = initialState.ajaxCallsInProgress, action) {
  if (action.type === actionTypes.BEGIN_AJAX_CALL) {
    return state + 1;
  } else if (action.type === actionTypes.AJAX_CALL_ERROR ||
  actionTypeEndsInSuccess(action.type)) {
    return state - 1;
  }
  return state;
}
