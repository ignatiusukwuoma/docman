import * as actionTypes from '../actions/actionTypes';
import initialState from '../store/initialState';

export function roles(state = initialState.roles, action) {
  const newRole = Object.assign({}, action.role);
  switch (action.type) {
    case actionTypes.GET_ROLES_SUCCESS:
      return action.roles;

    case actionTypes.CREATE_ROLE_SUCCESS:
      return [...state, newRole];

    case actionTypes.DELETE_ROLE_SUCCESS:
      return [...state.filter(role => role.id !== action.roleId)];

    case actionTypes.UPDATE_ROLE_SUCCESS:
      return [...state
      .filter(role => role.id !== newRole.id), newRole];

    default:
      return state;
  }
}
