import axios from 'axios';
import * as actionTypes from './actionTypes';
import { beginAjaxCall } from './ajaxStatusActions';
import handleError from '../utils/errorHandler';

/**
 * Thunk to search for documents
 * @param {string} query
 * @param {number} [offset=0]
 * @returns {object} action to dispatch
 */
export function searchDocuments(query, offset = 0) {
  return (dispatch) => {
    dispatch(beginAjaxCall());
    return axios.get(`/search/documents/?q=${query}&offset=${offset}`)
      .then((res) => {
        dispatch({
          type: actionTypes.SEARCH_DOCUMENTS_SUCCESS,
          documents: res.data.documents,
          pageData: res.data.pageData,
          query,
          offset
        });
      })
      .catch(error => handleError(error, dispatch));
  };
}

/**
 * Thunk to search for users
 * @param {string} query
 * @param {number} [offset=0]
 * @returns {object} action to dispatch
 */
export function searchUsers(query, offset = 0) {
  return (dispatch) => {
    dispatch(beginAjaxCall());
    return axios.get(`/search/users/?q=${query}&offset=${offset}`)
      .then((res) => {
        dispatch({
          type: actionTypes.SEARCH_USERS_SUCCESS,
          users: res.data.users,
          pageData: res.data.pageData,
          query,
          offset
        });
      })
      .catch(error => handleError(error, dispatch));
  };
}
