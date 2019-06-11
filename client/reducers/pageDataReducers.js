import * as actionTypes from '../actions/actionTypes';
import initialState from '../store/initialState';

/**
 * Reducers for pagedata
 * @param {object} [state=initialState.pageData]
 * @param {object} action
 * @returns {object} pagedata state
 */
function pageData(state = initialState.pageData, action) {
  switch (action.type) {
    case actionTypes.GET_USERS_SUCCESS:
    case actionTypes.SEARCH_USERS_SUCCESS:
    case actionTypes.GET_DOCUMENTS_SUCCESS:
    case actionTypes.SEARCH_DOCUMENTS_SUCCESS:
      return Object.assign(
        {}, action.pageData, { offset: action.offset, query: action.query }
      );
    default:
      return state;
  }
}

export default pageData;
