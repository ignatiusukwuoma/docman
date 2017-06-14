import * as types from '../actions/actionTypes';
import initialState from '../store/initialState';

function pageData(state = initialState.pageData, action) {
  switch (action.type) {
    case types.GET_DOCUMENTS_SUCCESS:
      return Object.assign(
        {}, action.pageData, { offset: action.offset, query: action.query }
      );
    default:
      return state;
  }
}

export default pageData;
