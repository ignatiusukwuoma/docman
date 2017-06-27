import expect from 'expect';
import userAccessReducers from '../../reducers/userAccessReducers';
import * as actionTypes from '../../actions/actionTypes';
import initialState from '../../store/initialState';

describe('User Access Reducer', () => {
  it('should set user when passed LOGIN_SUCCESS', () => {
    // arrange
    const userToLogin = { id: 2, username: 'admin', roleId: 2 };
    const action = {
      type: actionTypes.LOGIN_SUCCESS,
      user: userToLogin
    };
    const expectedState = {
      loggedIn: true, user: { id: 2, username: 'admin', roleId: 2 }
    };
    // act
    const newState = userAccessReducers(initialState.access, action);
    // assert
    expect(newState).toEqual(expectedState);
  });

  it('should set initial state when passed LOGOUT', () => {
    // arrange
    const currentState = {
      loggedIn: true,
      user: { id: 2, username: 'admin', roleId: 2 }
    };
    const action = { type: actionTypes.LOGOUT };
    const expectedState = { loggedIn: false, user: {} };
    // act
    const newState = userAccessReducers(currentState, action);
    // assert
    expect(newState).toEqual(expectedState);
  });

  it('should return the state when not affected', () => {
    // arrange
    const currentState = {
      loggedIn: true,
      user: { id: 2, username: 'admin', roleId: 2 }
    };
    const action = { type: 'NOT_MY_CONCERN' };
    // act
    const newState = userAccessReducers(currentState, action);
    // assert
    expect(newState).toEqual(currentState);
  });
});
