import expect from 'expect';
import { users, user } from '../../reducers/userReducers';
import * as actions from '../../actions/userActions';
import * as actionTypes from '../../actions/actionTypes';

describe('Users Reducers', () => {
  it('should get users when passed GET_USERS_SUCCESS', () => {
    // arrange
    const initialState = [];
    const allUsers = [
      { id: '1', username: 'A' },
      { id: '2', username: 'B' },
      { id: '3', username: 'C' }
    ];
    const action = {
      type: actionTypes.GET_USERS_SUCCESS,
      users: allUsers
    };
    // act
    const newState = users(initialState, action);
    // assert
    expect(newState).toEqual(allUsers);
  });

  it('should update a user when passed UPDATE_USER_SUCCESS', () => {
    // arrange
    const initialState = [
      { id: '1', username: 'A' },
      { id: '2', username: 'B' },
      { id: '3', username: 'C' }
    ];
    const newUser = { id: '2', username: 'Z' };
    const action = {
      type: actionTypes.UPDATE_USER_SUCCESS,
      user: newUser
    };
    // act
    const newState = users(initialState, action);
    const updatedUser = newState.find(profile => profile.id === newUser.id);
    const untouchedUser = newState.find(profile => profile.id === '1');
    // assert
    expect(updatedUser.username).toEqual('Z');
    expect(untouchedUser.username).toEqual('A');
    expect(newState.length).toBe(3);
  });

  it('should get search results when passed SEARCH_USERS_SUCCESS', () => {
    // arrange
    const initialState = [];
    const searchResult = [
      { id: '1', username: 'A' },
      { id: '2', username: 'B' },
      { id: '3', username: 'C' }
    ];
    const action = {
      type: actionTypes.SEARCH_USERS_SUCCESS,
      users: searchResult
    };
    // act
    const newState = users(initialState, action);
    //assert
    expect(newState).toEqual(searchResult);
  });

  it('should return the state when no actionType matches', () => {
    // arrange
    const initialState = [
      { id: '1', username: 'A' }
    ];
    const action = { type: 'NOT_MY_CONCERN' };
    // act
    const newState = users(initialState, action);
    // assert
    expect(newState).toEqual(initialState);
  });
});

describe('User Reducer', () => {
  it('should get user when passed GET_USER_SUCCESS', () => {
    // arrange
    const initialState = {};
    const myUser = { username: 'A' };
    const action = {
      type: actionTypes.GET_USER_SUCCESS,
      user: myUser
    };
    // act
    const newState = user(initialState, action);
    // assert
    expect(newState).toEqual(myUser);
  });

  it('should return the state when no actionType matches', () => {
    // arrange
    const initialState = { id: '1', username: 'A' };
    const action = { type: 'NOT_MY_CONCERN' };
    // act
    const newState = user(initialState, action);
    // assert
    expect(newState).toEqual(initialState);
  });
});
