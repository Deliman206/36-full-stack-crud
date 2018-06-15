import { combineReducers } from 'redux';
import token from './token';
import profile from './profile';
import pictures from './pictures';

export default combineReducers({ token, profile, pictures });
