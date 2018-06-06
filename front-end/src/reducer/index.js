import { combineReducers } from 'redux';
import libraries from './libraries';
import token from './token';

export default combineReducers({ libraries, token });
