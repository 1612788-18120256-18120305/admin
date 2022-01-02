import { combineReducers } from 'redux';
import authReducer from './authReducer';
import adminReducer from './adminReducer';
import userReducer from './userReducer';

export default combineReducers({
  auth: authReducer,
  admins: adminReducer,
  users: userReducer,
});
