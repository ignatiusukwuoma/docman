import * as actionTypes from '../actions/actionTypes';
import initialState from '../store/initialState';

function documentReducers(state = initialState.documentDatabase, action) {
  switch (action.type) {
    case actionTypes.GET_DOCUMENTS_SUCCESS:
      return {
        pageData: action.pageData,
        documents: action.documents
      };
    default:
      return state;
  }
}

export default documentReducers;
