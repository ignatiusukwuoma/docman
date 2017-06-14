import { combineReducers } from 'redux';
import userAccess from './userAccessReducers';
import users from './userReducers';
import documentData from './documentReducers';
import pageData from './pageDataReducers';

const rootReducer = combineReducers({
  userAccess,
  documentData,
  pageData,
  users
});

export default rootReducer;
