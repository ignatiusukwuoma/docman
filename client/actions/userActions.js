import axios from 'axios';
import jwt from 'jsonwebtoken';
import setAccessToken from '../utils/setAccessToken';
import * as actionTypes from './actionTypes';
import { beginAjaxCall } from './ajaxStatusActions';
import handleError, { throwError } from '../utils/errorHandler';

export function login(token, type) {
  setAccessToken(token);
  const decoded = jwt.decode(token);
  const user = {
    id: decoded.data.id,
    roleId: decoded.data.roleId,
    username: decoded.data.username
  };
  return {
    type,
    user
  };
}

export function signup(signupDetails) {
  return (dispatch) => {
    dispatch(beginAjaxCall());
    return axios.post('/users', signupDetails)
      .then((res) => {
        const token = res.data.token;
        const tokenStorage = JSON.stringify({
          jwt: token
        });
        localStorage.setItem('docman-pro', tokenStorage);
        dispatch(login(token, actionTypes.LOGIN_SUCCESS));
      })
      .catch(error => handleError(error, dispatch));
  };
}

export function signin(signinDetails) {
  return (dispatch) => {
    dispatch(beginAjaxCall());
    return axios.post('/users/login', signinDetails)
      .then((res) => {
        const token = res.data.token;
        const tokenStorage = JSON.stringify({
          jwt: token
        });
        localStorage.setItem('docman-pro', tokenStorage);

        dispatch(login(token, actionTypes.LOGIN_SUCCESS));
      })
      .catch(error => throwError(error, dispatch));
  };
}

export function logout() {
  return (dispatch) => {
    localStorage.removeItem('docman-pro');
    setAccessToken(null);
    dispatch({ type: actionTypes.LOGOUT });
  };
}

export function getUsers(offset = 0) {
  return (dispatch) => {
    dispatch(beginAjaxCall());
    return axios.get(`/users/?offset=${offset}`)
      .then((res) => {
        dispatch({
          type: actionTypes.GET_USERS_SUCCESS,
          users: res.data.users,
          pageData: res.data.pageData,
          offset
        });
      })
      .catch(error => handleError(error, dispatch));
  };
}

export function getUser(userId) {
  return (dispatch) => {
    dispatch(beginAjaxCall());
    return axios.get(`/users/${userId}`)
      .then((res) => {
        dispatch({
          type: actionTypes.GET_USER_SUCCESS,
          user: res.data
        });
      })
      .catch(error => handleError(error, dispatch));
  };
}

export function updateUser(userId, newProfileDetails) {
  return (dispatch) => {
    dispatch(beginAjaxCall());
    return axios.put(`/users/${userId}`, newProfileDetails)
      .then((res) => {
        dispatch({
          type: actionTypes.UPDATE_USER_SUCCESS,
          user: res.data
        });
      })
      .catch(error => handleError(error, dispatch));
  };
}

export function deleteUser(userId) {
  return (dispatch) => {
    dispatch(beginAjaxCall());
    return axios.delete(`/users/${userId}`)
      .then(() => {
        dispatch({
          type: actionTypes.DELETE_USER_SUCCESS
        });
      })
      .catch(error => handleError(error, dispatch));
  };
}
