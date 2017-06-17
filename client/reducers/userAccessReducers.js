import * as actionTypes from '../actions/actionTypes';
import initialState from '../store/initialState';

function userAccessReducers(state = initialState.access, action) {
  switch (action.type) {
    case actionTypes.LOGIN_SUCCESS:
      return {
        loggedIn: true,
        user: action.user
      };
    case actionTypes.LOGOUT:
      return initialState.access;
    default:
      return state;
  }
}
export default userAccessReducers;
