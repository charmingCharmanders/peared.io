import { combineReducers } from 'redux';
import {toggleModal} from './reducer-modal.js';
import {updateUserToyProblemModal} from './reducer-update-user-toy-problem-modal.js';
import {newUserToyProblemModal} from './reducer-new-user-toy-problem-modal.js';
import {toggleNav} from './reducer-nav.js';
import {updatePrompt} from './reducer-prompt';
import {updateCode} from './reducer-code';
import {updateRoomId} from './reducer-room-id';
import {updateButtonStatus} from './reducer-button-status';
import {updateTestResults} from './reducer-test-results';
import {updateSessionsData} from './reducer-session';
import {updateUserProfileData} from './reducer-profile';
import {updateUsersFriends} from './reducer-friends';
import {toggleDashboard} from './reducer-dashboard';
import {userToyProblems} from './reducer-user-toy-problems';
import {currentUserToyProblem} from './reducer-current-user-toy-problem';
// import {getUserToyProblemTests} from './reducer-get-user-toy-problem-tests';


export default combineReducers({
  modal: toggleModal,
  nav: toggleNav,
  prompt: updatePrompt,
  code: updateCode,
  roomId: updateRoomId,
  buttonStatus: updateButtonStatus,
  testResults: updateTestResults,
  sessionData: updateSessionsData,
  userProfileData: updateUserProfileData,
  testResults: updateTestResults,
  userFriendData: updateUsersFriends,
  isDashboard: toggleDashboard,
  userToyProblems: userToyProblems,
  updateUserToyProblemModal: updateUserToyProblemModal,
  newUserToyProblemModal: newUserToyProblemModal,
  currentUserToyProblem: currentUserToyProblem,
  // currentUserToyProblemTests: getUserToyProblemTests
});

