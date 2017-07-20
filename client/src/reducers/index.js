import { combineReducers } from 'redux';
import {toggleModal} from './reducer-modal.js';
import {toggleNav} from './reducer-nav.js';
import {updatePrompt} from './reducer-prompt'
import {updateCode} from './reducer-code';
import {updateRoomId} from './reducer-room-id';

export default combineReducers({
  modal: toggleModal,
  nav: toggleNav,
  prompt: updatePrompt,
  code: updateCode,
  roomId: updateRoomId
});