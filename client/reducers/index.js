import { combineReducers } from 'redux';
import userAccess from './userAccessReducers';
import { users, user } from './userReducers';
import { documents, document } from './documentReducers';
import pageData from './pageDataReducers';
import ajaxCallsInProgress from './ajaxStatusReducer';

const rootReducer = combineReducers({
  ajaxCallsInProgress,
  userAccess,
  documents,
  document,
  pageData,
  users,
  user
});

export default rootReducer;
