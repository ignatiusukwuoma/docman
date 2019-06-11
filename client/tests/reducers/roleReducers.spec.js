import expect from 'expect';
import roles from '../../reducers/roleReducers';
import * as actionTypes from '../../actions/actionTypes';

describe('Roles Reducer', () => {
  it('should get roles when passed GET_ROLES_SUCCESS', () => {
    // arrange
    const initialState = [];
    const allRoles = [
      { id: '1', name: 'admin' },
      { id: '2', name: 'author' },
      { id: '3', name: 'editor' }
    ];
    const action = {
      type: actionTypes.GET_ROLES_SUCCESS,
      roles: allRoles
    };
    // act
    const newState = roles(initialState, action);
    // assert
    expect(newState).toEqual(allRoles);
  });

  it('should add role when passed CREATE_ROLE_SUCCESS', () => {
    // arrange
    const initialState = [
      { name: 'admin' },
      { name: 'author' }
    ];
    const newRole = { name: 'editor' };
    const action = { type: actionTypes.CREATE_ROLE_SUCCESS, role: newRole };
    const expectedState = [
      { name: 'admin' },
      { name: 'author' },
      { name: 'editor' }
    ];
    // act
    const newState = roles(initialState, action);
    // assert
    expect(newState).toEqual(expectedState);
  });

  it('should update role when passed UPDATE_ROLE_SUCCESS', () => {
    // arrange
    const initialState = [
      { id: '1', name: 'admin' },
      { id: '2', name: 'author' },
      { id: '3', name: 'editor' }
    ];
    const updatedRole = { id: '3', name: 'advertizer' };
    const action = { type: actionTypes.UPDATE_ROLE_SUCCESS, role: updatedRole };
    const expectedState = [
      { id: '1', name: 'admin' },
      { id: '2', name: 'author' },
      { id: '3', name: 'advertizer' }
    ];
    // act
    const newState = roles(initialState, action);
    // assert
    expect(newState).toEqual(expectedState);
  });

  it('should delete role when passed DELETE_ROLE_SUCCESS', () => {
    // arrange
    const initialState = [
      { id: '1', name: 'admin' },
      { id: '2', name: 'author' },
      { id: '3', name: 'editor' }
    ];
    const roleToDelete = { id: '3', name: 'editor' };
    const action = {
      type: actionTypes.DELETE_ROLE_SUCCESS,
      roleId: roleToDelete.id
    };
    const expectedState = [
      { id: '1', name: 'admin' },
      { id: '2', name: 'author' }
    ];
    // act
    const newState = roles(initialState, action);
    // assert
    expect(newState).toEqual(expectedState);
  });

  it('should return the state when not affected', () => {
    // arrange
    const initialState = [
      { id: '1', name: 'admin' },
      { id: '2', name: 'author' },
      { id: '3', name: 'editor' }
    ];
    const action = { type: 'NOT_MY_CONCERN' };
    // act
    const newState = roles(initialState, action);
    // assert
    expect(newState).toEqual(initialState);
  });
});
