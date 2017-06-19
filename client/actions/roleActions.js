import axios from 'axios';
import * as actionTypes from './actionTypes';
import { beginAjaxCall } from './ajaxStatusActions';
import handleError from '../utils/errorHandler';

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
