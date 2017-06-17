import * as actionTypes from '../actions/actionTypes';
import initialState from '../store/initialState';

export function users(state = initialState.users, action) {
  // const newDocument = Object.assign({}, action.document);
  switch (action.type) {
    case actionTypes.GET_USERS_SUCCESS:
      return action.users;

    // case actionTypes.CREATE_DOCUMENT_SUCCESS:
    //   return [newDocument, ...state];

    // case actionTypes.UPDATE_DOCUMENT_SUCCESS:
    //   return [newDocument, ...state.filter(file => file.id !== newDocument.id)];

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
