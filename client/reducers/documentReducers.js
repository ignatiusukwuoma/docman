import * as actionTypes from '../actions/actionTypes';
import initialState from '../store/initialState';

/**
 * Reducers for documents
 * @param {array} [state=initialState.documents]
 * @param {object} action
 * @returns {array} documents state
 */
export function documents(state = initialState.documents, action) {
  const newDocument = Object.assign({}, action.document);
  switch (action.type) {
    case actionTypes.GET_DOCUMENTS_SUCCESS:
    case actionTypes.SEARCH_DOCUMENTS_SUCCESS:
      return action.documents;

    case actionTypes.CREATE_DOCUMENT_SUCCESS:
      return [newDocument, ...state];

    case actionTypes.UPDATE_DOCUMENT_SUCCESS:
      return [newDocument, ...state.filter(file => file.id !== newDocument.id)];

    default:
      return state;
  }
}

/**
 * Reducer for individual document
 * @param {object} [state=initialState.document]
 * @param {object} action
 * @returns {object} document state
 */
export function document(state = initialState.document, action) {
  switch (action.type) {
    case actionTypes.GET_DOCUMENT_SUCCESS:
      return action.document;
    default:
      return state;
  }
}
