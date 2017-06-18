import * as actionTypes from '../actions/actionTypes';
import initialState from '../store/initialState';

export function users(state = initialState.users, action) {
  const updatedUser = Object.assign({}, action.user);
  switch (action.type) {
    case actionTypes.GET_USERS_SUCCESS:
      return action.users;

    case actionTypes.UPDATE_USER_SUCCESS:
      return [updatedUser, ...state
      .filter(profile => profile.id !== updatedUser.id)];

    default:
      return state;
  }
}

export function user(state = initialState.user, action) {
  if (action.type === actionTypes.GET_USER_SUCCESS) {
    return action.user;
  }
  return state;
}
