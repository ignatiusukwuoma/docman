import * as actionTypes from './actionTypes';

/**
 * Action creator that's called when ajax call begins
 * @returns {object} action
 */
export function beginAjaxCall() {
  return { type: actionTypes.BEGIN_AJAX_CALL };
}

/**
 * Action creator that starts when ajax call ends
 * @returns {object} action
 */
export function ajaxCallError() {
  return { type: actionTypes.AJAX_CALL_ERROR };
}
