import expect from 'expect';
import pageData from '../../reducers/pageDataReducers';
import * as actionTypes from '../../actions/actionTypes';

describe('PageData Reducer', () => {
  it('should get the pagination values when passed GET_USERS_SUCCESS', () => {
    // arrange
    const initialState = {
      count: 1, pageNumber: 1, offset: 0, query: ''
    };
    const pagination = {
      count: 9, pageNumber: 9, offset: 0, query: ''
    };
    const action = {
      type: actionTypes.GET_USERS_SUCCESS,
      pageData: pagination,
      offset: 0,
      query: ''
    };
    const newState = pageData(initialState, action);
    expect(newState).toEqual(pagination);
  });

  it('should return state when not affected', () => {
    // arrange
    const initialState = {
      count: 1, pageNumber: 1, offset: 0, query: ''
    };
    const action = { type: actionTypes.NOT_MY_CONCERN };
    const newState = pageData(initialState, action);
    expect(newState).toEqual(initialState);
  });
});
