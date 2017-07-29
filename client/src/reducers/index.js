import { combineReducers } from 'redux';
import {toggleModal} from './reducer-modal.js';
import {toggleNav} from './reducer-nav.js';
import {updatePrompt} from './reducer-prompt';
import {updateCode} from './reducer-code';
import {updateOnlineUsers} from './reducer-online-users';
import {updateRoomId} from './reducer-room-id';
import {updateButtonStatus} from './reducer-button-status';
import {updateTestResults} from './reducer-test-results';
import {updateSessionsData} from './reducer-session';
import {updateUserProfileData} from './reducer-profile';
import {updateUsersFriends} from './reducer-friends';
import {toggleDashboard} from './reducer-dashboard';
import {populateLeaderboard} from './reducer-leaderboard';
import {updateCurrentTime} from './reducer-current-time';
import {updateCurrentQuestion} from './reducer-current-question';
import {toggleQuestionModal} from './reducer-question-modal.js';

export default combineReducers({
  questionModal: toggleQuestionModal,
  currentQuestion: updateCurrentQuestion,
  modal: toggleModal,
  nav: toggleNav,
  prompt: updatePrompt,
  currentTime: updateCurrentTime,
  code: updateCode,
  onlineUsers: updateOnlineUsers,
  roomId: updateRoomId,
  buttonStatus: updateButtonStatus,
  testResults: updateTestResults,
  sessionData: updateSessionsData,
  userProfileData: updateUserProfileData,
  testResults: updateTestResults,
  userFriendData: updateUsersFriends,
  isDashboard: toggleDashboard,
  leaderboard: populateLeaderboard
});

