import axios from 'axios';
import * as actionTypes from './actionTypes';
import { beginAjaxCall } from './ajaxStatusActions';
import handleError, { throwError } from '../utils/errorHandler';

export function getRoles() {
  return (dispatch) => {
    dispatch(beginAjaxCall());
    return axios.get('/roles')
      .then((res) => {
        dispatch({
          type: actionTypes.GET_ROLES_SUCCESS,
          roles: res.data,
        });
      })
      .catch(error => handleError(error, dispatch));
  };
}

export function createRole(role) {
  return (dispatch) => {
    dispatch(beginAjaxCall());
    return axios.post('/roles', role)
      .then((res) => {
        dispatch({
          type: actionTypes.CREATE_ROLE_SUCCESS,
          message: res.data.message,
          role: res.data.role
        });
      })
      .catch(error => throwError(error, dispatch));
  };
}

export function updateRole(roleId, newRoleDetails) {
  return (dispatch) => {
    dispatch(beginAjaxCall());
    return axios.put(`/roles/${roleId}`, newRoleDetails)
      .then((res) => {
        dispatch({
          type: actionTypes.UPDATE_ROLE_SUCCESS,
          role: res.data.updatedRole
        });
      })
      .catch(error => throwError(error, dispatch));
  };
}


export function deleteRole(roleId) {
  return (dispatch) => {
    dispatch(beginAjaxCall());
    return axios.delete(`/roles/${roleId}`)
      .then(() => {
        dispatch({
          type: actionTypes.DELETE_ROLE_SUCCESS,
          roleId
        });
      })
      .catch(error => handleError(error));
  };
}
