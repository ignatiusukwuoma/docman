import * as actionTypes from '../actions/actionTypes';
import initialState from '../store/initialState';

export function documents(state = initialState.documents, action) {
  const newDocument = Object.assign({}, action.document);
  switch (action.type) {
    case actionTypes.GET_DOCUMENTS_SUCCESS:
      return action.documents;

    case actionTypes.CREATE_DOCUMENT_SUCCESS:
      return [newDocument, ...state];

    case actionTypes.UPDATE_DOCUMENT_SUCCESS:
      return [newDocument, ...state.filter(file => file.id !== newDocument.id)];

    default:
      return state;
  }
}

export function document(state = initialState.document, action) {
  switch (action.type) {
    case actionTypes.GET_DOCUMENT_SUCCESS:
      return action.document;
    default:
      return state;
  }
}
