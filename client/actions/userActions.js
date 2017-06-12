import axios from 'axios';
import jwt from 'jsonwebtoken';
import setAccessToken from '../utils/setAccessToken';
import * as actionTypes from './actionTypes';

export function signupSuccess(message) {
  return {
    type: actionTypes.SIGNUP_SUCCESS,
    message
  };
}

export function login(token, type) {
  console.log('Token', token);
  setAccessToken(token);
  const decoded = jwt.decode(token);
  console.log('Decoded', decoded);
  const user = {
    id: decoded.data.id,
    roleId: decoded.data.roleId,
    username: decoded.data.username
  };
  console.log('User', user);
  return {
    type,
    user
  };
}

export function signup(signupDetails) {
  console.log('signupDetails', signupDetails);
  return (dispatch) => {
    return axios.post('/users', signupDetails)
      .then((res) => {
        const token = res.data.token;
        const tokenStorage = JSON.stringify({
          jwt: token
        });
        localStorage.setItem('docman-pro', tokenStorage);
        // dispatch(signupSuccess(res.data.message)); TODO - Create Reducer
        dispatch(login(token, actionTypes.LOGIN_SUCCESS));
      });
  };
}

export function signin(signinDetails) {
  console.log('signinDetails', signinDetails);
  return (dispatch) => {
    return axios.post('/users/login', signinDetails)
      .then((res) => {
        const token = res.data.token;
        console.log('res.data', res.data);
        localStorage.setItem('jwToken', token);

        dispatch(login(token, actionTypes.LOGIN_SUCCESS));
      });
  };
}
