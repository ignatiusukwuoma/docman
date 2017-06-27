import expect from 'expect';
import ajaxStatusReducer from '../../reducers/ajaxStatusReducer';
import * as actionTypes from '../../actions/actionTypes';

describe('Ajax Status Reducer', () => {
  it('should increment state when passed BEGIN_AJAX_CALL', () => {
    const initialState = 0;
    const action = { type: actionTypes.BEGIN_AJAX_CALL };
    const newState = ajaxStatusReducer(initialState, action);
    expect(newState).toEqual(1);
  });

  it('should decrement state when ajax call is successful', () => {
    const initialState = 1;
    const action = { type: actionTypes.GET_DOCUMENTS_SUCCESS };
    const newState = ajaxStatusReducer(initialState, action);
    expect(newState).toEqual(0);
  });

  it('should decrement state when passed AJAX_CALL_ERROR', () => {
    const initialState = 1;
    const action = { type: actionTypes.AJAX_CALL_ERROR };
    const newState = ajaxStatusReducer(initialState, action);
    expect(newState).toEqual(0);
  });

  it('should return state when passed AJAX_CALL_ERROR but state is 0', () => {
    const initialState = 0;
    const action = { type: actionTypes.AJAX_CALL_ERROR };
    const newState = ajaxStatusReducer(initialState, action);
    expect(newState).toEqual(initialState);
  });

  it('should return state when not affected', () => {
    const initialState = 0;
    const action = { type: 'NOT_MY_CONCERN' };
    const newState = ajaxStatusReducer(initialState, action);
    expect(newState).toEqual(initialState);
  });
});
