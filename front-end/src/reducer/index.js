import { combineReducers } from 'redux';
import libraries from './libraries';
import token from './token';
import profile from './profile';

export default combineReducers({ libraries, token, profile });
