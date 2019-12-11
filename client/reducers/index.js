import { combineReducers } from 'redux';
import { users, user } from './userReducers';
import { documents, document } from './documentReducers';
import ajaxCallsInProgress from './ajaxStatusReducer';
import userAccess from './userAccessReducers';
import pageData from './pageDataReducers';
import roles from './roleReducers';

const rootReducer = combineReducers({
  ajaxCallsInProgress,
  userAccess,
  documents,
  document,
  pageData,
  users,
  roles,
  user
});

export default rootReducer;
