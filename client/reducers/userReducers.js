import * as actionTypes from '../actions/actionTypes';
import initialState from '../store/initialState';

export default function userReducers(state = initialState.access, action) {
  switch (action.type) {
    case actionTypes.LOGIN_SUCCESS:
      console.log('State from Reducer', state);
      return {
        loggedIn: true,
        user: action.user
      };
    default:
      return state;
  }
}
