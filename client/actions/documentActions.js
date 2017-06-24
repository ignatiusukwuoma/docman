import axios from 'axios';
import * as actionTypes from './actionTypes';
import { beginAjaxCall } from './ajaxStatusActions';
import handleError from '../utils/errorHandler';

/**
 * Action creator dispatched when documents are retrieved from database
 * @param {array} documents
 * @param {object} pageData
 * @param {number} offset
 * @returns {object} action
 */
export function getDocumentSuccess(documents, pageData, offset) {
  return {
    type: actionTypes.GET_DOCUMENTS_SUCCESS,
    documents,
    pageData,
    offset
  };
}


/**
 * Thunk to get Documents
 * @param {number} [offset=0]
 * @returns {function} getDocumentSuccess
 */
export function getDocuments(offset = 0) {
  return (dispatch) => {
    dispatch(beginAjaxCall());
    return axios.get(`/documents?offset=${offset}`)
      .then((res) => {
        dispatch(getDocumentSuccess(res.data.documents,
          res.data.pageData, offset));
      })
      .catch(error => handleError(error, dispatch));
  };
}


/**
 * Thunk to get a user's documents
 * @param {number} userId
 * @param {number} [offset=0]
 * @returns {function} getDocumentSuccess
 */
export function getUserDocuments(userId, offset = 0) {
  return (dispatch) => {
    dispatch(beginAjaxCall());
    return axios.get(`/users/${userId}/documents?offset=${offset}`)
      .then((res) => {
        dispatch(getDocumentSuccess(res.data.documents,
          res.data.pageData, offset));
      })
      .catch(error => handleError(error, dispatch));
  };
}


/**
 * Thunk to create document
 * @param {object} document
 * @returns {object} action
 */
export function createDocument(document) {
  return (dispatch) => {
    dispatch(beginAjaxCall());
    return axios.post('/documents', document)
      .then((res) => {
        dispatch({
          type: actionTypes.CREATE_DOCUMENT_SUCCESS,
          message: res.data.message,
          document: res.data.document
        });
      })
      .catch(error => handleError(error, dispatch));
  };
}


/**
 * Thunk to get full details of a document
 * @param {number} documentId
 * @returns {object} action
 */
export function getDocument(documentId) {
  return (dispatch) => {
    dispatch(beginAjaxCall());
    return axios.get(`/documents/${documentId}`)
      .then((res) => {
        dispatch({
          type: actionTypes.GET_DOCUMENT_SUCCESS,
          document: res.data
        });
      })
      .catch(error => handleError(error, dispatch));
  };
}


/**
 * Thunk to update a dosument
 * @param {object} document
 * @returns {object} action
 */
export function updateDocument(document) {
  const documentId = document.id;
  return (dispatch) => {
    dispatch(beginAjaxCall());
    return axios.put(`/documents/${documentId}`, document)
      .then((res) => {
        dispatch({
          type: actionTypes.UPDATE_DOCUMENT_SUCCESS,
          message: res.data.message,
          document: res.data.updatedDocument
        });
      })
      .catch(error => handleError(error, dispatch));
  };
}


/**
 * Thunk to delete a document
 * @param {number} documentId
 * @return {object} action
 */
export function deleteDocument(documentId) {
  return (dispatch) => axios.delete(`/documents/${documentId}`)
    .then(() => {
      dispatch({
        type: actionTypes.DELETE_DOCUMENT_SUCCESS
      });
    })
    .catch(error => handleError(error, dispatch));
}
