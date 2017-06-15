import axios from 'axios';
import * as actionTypes from './actionTypes';
import { beginAjaxCall } from './ajaxStatusActions';
import handleError from '../utils/errorHandler';

export function getDocuments() {
  return (dispatch) => {
    dispatch(beginAjaxCall());
    return axios.get('/documents')
      .then((res) => {
        dispatch({
          type: actionTypes.GET_DOCUMENTS_SUCCESS,
          documents: res.data.documents,
          pageData: res.data.pageData,
        });
      })
      .catch(error => handleError(error, dispatch));
  };
}

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

export function deleteDocument(documentId) {
  console.log('id to send', documentId);
  return (dispatch) => {
    return axios.delete(`/documents/${documentId}`)
      .then(() => {
        dispatch({
          type: actionTypes.DELETE_DOCUMENT_SUCCESS
        });
      })
      .catch(error => handleError(error, dispatch));
  };
}
