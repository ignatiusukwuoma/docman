import * as actionTypes from './actionTypes';

export function beginAjaxCall() {
  return { type: actionTypes.BEGIN_AJAX_CALL };
}
