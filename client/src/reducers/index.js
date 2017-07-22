import { combineReducers } from 'redux';
import {toggleModal} from './reducer-modal.js';
import {toggleNav} from './reducer-nav.js';
import {updatePrompt} from './reducer-prompt';
import {updateCode} from './reducer-code';
import {updateRoomId} from './reducer-room-id';
import {updateButtonStatus} from './reducer-button-status';
<<<<<<< HEAD
import {updateTestResults} from './reducer-test-results';
=======
import {updateSessionsData} from './reducer-session';
import {updateUserProfileData} from './reducer-profile';
>>>>>>> implement user and session api calls and dynamically render session data from db

export default combineReducers({
  modal: toggleModal,
  nav: toggleNav,
  prompt: updatePrompt,
  code: updateCode,
  roomId: updateRoomId,
  buttonStatus: updateButtonStatus,
<<<<<<< HEAD
  testResults: updateTestResults
});
=======
  sessionData: updateSessionsData,
  userProfileData: updateUserProfileData
  //userFriendData: updateUserFriendData
});
>>>>>>> implement user and session api calls and dynamically render session data from db
