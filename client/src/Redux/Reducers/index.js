import { combineReducers } from 'redux';
import authReducer from './authReducer';
import cardReducer from './cardReducer';
import userReducer from './userReducer';

export default combineReducers({ authReducer, cardReducer, userReducer});