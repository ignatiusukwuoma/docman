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
  console.log('Doc to send', document);
  return (dispatch) => {
    return axios.post('/documents', document)
      .then((res) => {
        console.log('Doc Response', res.data);
        dispatch({
          type: actionTypes.CREATE_DOCUMENT_SUCCESS,
          message: res.data.message,
          document: res.data.document
        });
      })
      .catch(err => console.log('Create Error', err));
  };
}
