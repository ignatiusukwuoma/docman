import * as actionTypes from '../actions/actionTypes';
import initialState from '../store/initialState';

/**
 * Reducer for users
 * @param {array} [state=initialState.users]
 * @param {object} action
 * @returns {array} users state
 */
export function users(state = initialState.users, action) {
  const updatedUser = Object.assign({}, action.user);
  switch (action.type) {
    case actionTypes.GET_USERS_SUCCESS:
    case actionTypes.SEARCH_USERS_SUCCESS:
      return action.users;

    case actionTypes.UPDATE_USER_SUCCESS:
      return [updatedUser, ...state
      .filter(profile => profile.id !== updatedUser.id)];

    default:
      return state;
  }
}

/**
 * Reducer for an individual user
 * @param {object} [state=initialState.user]
 * @param {object} action
 * @returns {object} user state
 */
export function user(state = initialState.user, action) {
  if (action.type === actionTypes.GET_USER_SUCCESS) {
    return action.user;
  }
  return state;
}
