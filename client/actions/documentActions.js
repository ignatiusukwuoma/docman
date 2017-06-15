import axios from 'axios';
import * as actionTypes from './actionTypes';

export function getDocuments() {
  return (dispatch) => {
    return axios.get('/documents')
      .then((res) => {
        dispatch({
          type: actionTypes.GET_DOCUMENTS_SUCCESS,
          documents: res.data.documents,
          pageData: res.data.pageData,
        });
      })
      .catch(err => console.log(err));
  };
}

export function createDocument(document) {
  return (dispatch) => {
    return axios.post('/documents', document)
      .then((res) => {
        dispatch({
          type: actionTypes.CREATE_DOCUMENT_SUCCESS,
          message: res.data.message,
          document: res.data.document
        });
      })
      .catch(err => console.log('Create Error', err));
  };
}

export function getDocument(documentId) {
  return (dispatch) => {
    return axios.get(`/documents/${documentId}`)
      .then((res) => {
        dispatch({
          type: actionTypes.GET_DOCUMENT_SUCCESS,
          document: res.data
        });
      })
      .catch(error => console.log(error));
  };
}

export function updateDocument(documentId) {
  console.log('id to send', documentId);
  return (dispatch) => {
    return axios.put(`/documents/${documentId}`)
      .then((res) => {
        console.log('Doc Response', res.data);
        dispatch({
          type: actionTypes.UPDATE_DOCUMENT_SUCCESS,
          message: res.data.message,
          document: res.data.updatedDocument
        });
      })
      .catch(err => console.log(err));
  };
}
