import { combineReducers } from 'redux';
import userAccess from './userAccessReducers';
import users from './userReducers';
import documentData from './documentReducers';

const rootReducer = combineReducers({
  userAccess,
  documentData,
  users
});

export default rootReducer;
