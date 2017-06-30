import axios from 'axios';
import jwt from 'jsonwebtoken';
import setAccessToken from '../utils/setAccessToken';
import * as actionTypes from './actionTypes';
import { beginAjaxCall } from './ajaxStatusActions';
import handleError, { throwError } from '../utils/errorHandler';

/**
 * Action creator called after user logs in or registers
 * @param {number} token
 * @param {string} type
 * @returns {object} action to dispatch
 */
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

/**
 * This function saves token to localStorage and dispatches login
 * @param {object} responseData
 * @param {string} type
 * @param {function} dispatch
 */
function saveToken(responseData, type, dispatch) {
  const token = responseData.token;
  const tokenStorage = JSON.stringify({
    jwt: token
  });
  localStorage.setItem('docman-pro', tokenStorage);
  dispatch(login(token, type));
}

/**
 * Thunk that creates a new user
 * @param {object} signupDetails
 * @returns {function} login
 */
export function signup(signupDetails) {
  return (dispatch) => {
    dispatch(beginAjaxCall());
    return axios.post('/users', signupDetails)
      .then((res) => {
        saveToken(res.data, actionTypes.LOGIN_SUCCESS, dispatch);
      })
      .catch(error => throwError(error, dispatch));
  };
}

/**
 * Thunk that logs in a user
 * @param {object} signinDetails
 * @returns {function} login
 */
export function signin(signinDetails) {
  return (dispatch) => {
    dispatch(beginAjaxCall());
    return axios.post('/users/login', signinDetails)
      .then((res) => {
        saveToken(res.data, actionTypes.LOGIN_SUCCESS, dispatch);
      })
      .catch(error => throwError(error, dispatch));
  };
}

/**
 * Thunk that logs out a user
 * @returns {object} action to dispatch
 */
export function logout() {
  return (dispatch) => {
    localStorage.removeItem('docman-pro');
    setAccessToken(null);
    dispatch({ type: actionTypes.LOGOUT });
  };
}

/**
 * Thunk that retrieves all users
 * @param {number} [offset=0]
 * @returns {object} action to dispatch
 */
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

/**
 * Thunk that gets a user's details
 * @param {number} userId
 * @returns {object} action to dispatch
 */
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

/**
 * Thunk that updates a user
 * @param {number} userId
 * @param {object} newProfileDetails
 * @returns {object} action to dispatch
 */
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
      .catch(error => throwError(error, dispatch));
  };
}

/**
 * Thunk to delete a user
 * @param {number} userId
 * @returns {object} action to dispatch
 */
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
