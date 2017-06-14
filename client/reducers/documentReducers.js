import * as actionTypes from '../actions/actionTypes';
import initialState from '../store/initialState';

function documentReducers(state = initialState.documentDatabase, action) {
  const newDocument = Object.assign({}, action.document);
  let newState;
  switch (action.type) {
    case actionTypes.GET_DOCUMENTS_SUCCESS:
      return action.documents;

    case actionTypes.CREATE_DOCUMENT_SUCCESS:
      console.log('Reducer State', state);
      newState = [...state, newDocument];
      return newState;
    default:
      return state;
  }
}

export default documentReducers;
