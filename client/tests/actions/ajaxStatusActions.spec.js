import expect from 'expect';
import * as ajaxStatusActions from '../../actions/ajaxStatusActions';
import * as actionTypes from '../../actions/actionTypes';

describe('Ajax Status Actions', () => {
  it('returns a BEGIN_AJAX_CALL action', () => {
    const expectedAction = {
      type: actionTypes.BEGIN_AJAX_CALL
    };
    const action = ajaxStatusActions.beginAjaxCall();
    expect(action).toEqual(expectedAction);
  });
  it('returns a AJAX_CALL_ERROR action', () => {
    const expectedAction = {
      type: actionTypes.AJAX_CALL_ERROR
    };
    const action = ajaxStatusActions.ajaxCallError();
    expect(action).toEqual(expectedAction);
  });

});
