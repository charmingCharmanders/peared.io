import { combineReducers } from 'redux';
// import UserReducer from './reducer-users';
// import ActiveUserReducer from './reducer-active-user.js';
import {toggleModal} from './reducer-modal.js';


export default combineReducers({
  // users: UserReducer,
  // activeUser: ActiveUserReducer,
  // modal: ['a','b','c']
  modal: toggleModal
});