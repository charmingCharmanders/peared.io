import { combineReducers } from 'redux';
import {toggleModal} from './reducer-modal.js';
import {toggleNav} from './reducer-nav.js';

export default combineReducers({
  modal: toggleModal,
  nav: toggleNav
});