import axios from 'axios';
import * as actionTypes from './actionTypes';

export function getDocuments() {
  return (dispatch) => {
    return axios.get('/documents')
      .then((res) => {
        console.log('Doc Response', res.data);
        dispatch({
          type: actionTypes.GET_DOCUMENTS_SUCCESS,
          documents: res.data.documents,
          pageData: res.data.pageData,
        });
      })
      .catch(err => console.log(err));
  };
}
