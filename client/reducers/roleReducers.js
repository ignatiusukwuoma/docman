import * as actionTypes from '../actions/actionTypes';
import initialState from '../store/initialState';

export function roles(state = initialState.roles, action) {
  // const updatedUser = Object.assign({}, action.user);
  switch (action.type) {
    case actionTypes.GET_ROLES_SUCCESS:
      return action.roles;

    // case actionTypes.UPDATE_USER_SUCCESS:
    //   return [updatedUser, ...state
    //   .filter(profile => profile.id !== updatedUser.id)];

    default:
      return state;
  }
}
