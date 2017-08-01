let userProfileId;

const helpers = require('./helpers');
import axios from 'axios';

const openModal = (type) => {
  return {
    type: 'OPEN_MODAL',
    payload: type
  };
};

const closeModal = () => {
  return {
    type: 'CLOSE_MODAL'
  };
};

const postUserToyProblem = (newToyProblem, newToyProblemTest) => {
  return dispatch => {
    axios.post('/api/prompts', newToyProblem)
      .then(prompt => {
        newToyProblemTest.promptId = prompt.data.id;
        axios.post('/api/tests', newToyProblemTest)
          .then(test => {
            dispatch({
              type: 'POST_USER_TOY_PROBLEM',
              newToyProblem: prompt.data,
              newToyProblemTest: test.data
            });
          });

      });
  };
};

const toggleUpdateUserToyProblemModal = (show, toyProblem) => {
  return {
    type: 'TOGGLE_UPDATE_USER_TOY_PROBLEM_MODAL',
    payload: show,
  };
};

const getUserToyProblemTests = (userId) => {
  return dispatch => {
    axios.get(`/api/tests/${userId}`)
      .then(test => {
        dispatch({
          type: 'GET_USER_TOY_PROBLEM_TESTS',
          payload: test.data
        });
      });
  };
};


const setCurrentUserToyProblem = (toyProblem) => {
  return {
    type: 'SET_CURRENT_USER_TOY_PROBLEM',
    payload: toyProblem
  };
};

const toggleNewUserToyProblemModal = (status) => {
  return {
    type: 'TOGGLE_NEW_USER_TOY_PROBLEM_MODAL',
    payload: status
  };
};

const openQuestionModal = () => {
  return {
    type: 'OPEN_QUESTION_MODAL'
  };
};

const closeQuestionModal = () => {
  return {
    type: 'CLOSE_QUESTION_MODAL'
  };
};

const dashboardToSession = () => {
  return {
    type: 'DASHBOARD_TO_SESSION'
  };
};

const sessionToDashboard = () => {
  return {
    type: 'SESSION_TO_DASHBOARD'
  };
};

const updatePrompt = (prompt) => {
  return {
    type: 'UPDATE_PROMPT',
    payload: prompt
  };
};

const updateCode = (code) => {
  return {
    type: 'UPDATE_CODE',
    payload: code
  };
};

const updateCurrentQuestion = (questionNumber) => {
  return {
    type: 'UPDATE_CURRENT_QUESTION',
    payload: questionNumber
  };
};

const updateCurrentSession = (session) => {
  return {
    type: 'UPDATE_CURRENT_SESSION',
    payload: session
  };
};

const updateRoomId = (roomId) => {
  return {
    type: 'UPDATE_ROOM_ID',
    payload: roomId
  };
};

const updateOnlineUsers = (userCount) => {
  console.log('users count is:', userCount);
  return {
    type: 'UPDATE_ONLINE_USERS',
    payload: userCount
  };
};

const updateButtonStatus = (update) => {
  return {
    type: 'UPDATE_START_SESSION_BUTTON',
    payload: update
  };
};

const updateTestResults = (testResults) => {
  return {
    type: 'UPDATE_TEST_RESULTS',
    payload: testResults
  };
};

const incrementCurrentTime = (currentTime) => {
  console.log('incrementing the current time:', currentTime);
  var result = '00:00:00';
  result = helpers.generateNewTime(...currentTime.split(':'));
  return {
    type: 'UPDATE_CURRENT_TIME',
    payload: result
  };
};

const setCurrentTimeToZero = () => {
  return {
    type: 'UPDATE_CURRENT_TIME',
    payload: '00:00:00'
  };
};

const populateLeaderboard = () => {
  return dispatch => {
    axios.get('/api/profiles?sortBy=rating&limit=10')
      .then(result => {
        let ratingArray = result.data.map(profile => {
          return {
            name: profile.firstName,
            rating: profile.rating
          };
        });
        dispatch({
          type: 'POPULATE_LEADERBOARD',
          payload: ratingArray
        });
      });
  };
};

const populateUserToyProblems = () => {
  let id = null;
  return dispatch => {
    axios.get('/loggedin')
      .then(result => {
        id = result.data.id;
        axios.get(`/api/profiles/${result.data.id}/prompts`)
          .then(result => {
            dispatch({
              type: 'POPULATE_USER_TOY_PROBLEMS',
              payload: result.data
            });
          })
          .catch(err => {
            console.log(err);
          });
      });
  };
};

const updateToyProblemTests = (testArray) => {
  for (let i = 0; i < testArray.length; i++) {
    axios.put(`/api/tests/${testArray[i].promptId}`, testArray[i]);
  }
  return {
    type: 'UPDATE_TOY_PROBLEM_TESTS',
    payload: testArray
  };
};

const updateUserToyProblem = ({name, description, hint, category, difficulty, updatedAt, id, skeletonCode, solutionCode}) => {
  axios.put(`/api/prompts/${id}`, {
    name: name,
    description: description,
    category: category,
    hint: hint,
    difficulty: difficulty,
    updatedAt: updatedAt,
    skeletonCode: skeletonCode,
    solutionCode: solutionCode
  });

  return {
    type: 'UPDATE_USER_TOY_PROBLEMS',
    payload: {
      name: name,
      description: description,
      hint: hint,
      category: category,
      difficulty: difficulty,
      updatedAt: updatedAt,
      id: id,
      skeletonCode: skeletonCode,
      solutionCode: solutionCode
    }
  };
};

const deleteToyProblem = (toyProblemId) => {
  axios.delete(`/api/prompts/${toyProblemId}`);

  return {
    type: 'DELETE_TOY_PROBLEM',
    payload: toyProblemId
  };
};

const populateUserData = () => {

  return dispatch => {
    return axios.get('/loggedin')
      .then(result => {
        dispatch({
          type: 'POPULATE_USER_PROFILE_DATA',
          payload: result.data
        });
        return result;
      });
  };
};

const populateUserSessionsData = (userProfileId) => {
  return dispatch => {
    return axios.get(`/api/profiles/${userProfileId}/sessions`)
      .then(result => {
        let sessionInfo;
        if (result.data) {
          sessionInfo = helpers.formatSessionsData(result.data, userProfileId);
        } else {
          sessionInfo = [];
        }
        dispatch({
          type: 'POPULATE_USER_SESSIONS',
          payload: sessionInfo
        });
      });
  };
};



const populateUserFriendsData = (userProfileId) => {
  return dispatch => {
    return axios.get(`/api/friends?profileId=${userProfileId}`)
      .then(result => {
        dispatch({
          type: 'POPULATE_USERS_FRIENDS',
          payload: result.data
        });
      });
  };
};

const updateUserFriendsData = (friendsList) => {
  return {
    type: 'POPULATE_USERS_FRIENDS',
    payload: friendsList
  };
};


const endSession = (sessions, session, code, testResults) => {
  const sessionEndedAt = new Date();
  const sessionScore = helpers.calculateSessionScore(
    3600,
    (Date.parse(sessionEndedAt) - Date.parse(session.startedAt)) / 1000,
    session.prompt.difficulty,
    testResults.testsCount,
    testResults.testsPassed
  );

  return dispatch => {
    axios.post('/api/sessions', {
      profileId1: session.profileId1,
      profileId2: session.profileId2,
      promptId: session.prompt.id,
      rating: sessionScore,
      solutionCode: code,
      numberOfTests: testResults.testsCount,
      numberOfTestsPassed: testResults.testsPassed,
      startedAt: session.startedAt,
      endedAt: sessionEndedAt
    });

    axios.get(`/api/profiles/${session.profileId1}`)
      .then(profile => {
        axios.put(`/api/profiles/${session.profileId1}`, {
          rating: Number(profile.data.rating) + sessionScore
        });
      });

    axios.get(`/api/profiles/${session.profileId2}`)
      .then(profile => {
        axios.put(`/api/profiles/${session.profileId2}`, {
          rating: Number(profile.data.rating) + sessionScore
        });
      });
  };
};

const updateSkeletonCode = (code) => {
  return {
    type: 'UPDATE_SKELETON_CODE',
    payload: code
  };
};

const updateSolutionCode = (code) => {
  return {
    type: 'UPDATE_SOLUTION_CODE',
    payload: code
  };
};


const setNewSkeletonCode = (code) => {
  return {
    type: 'SET_NEW_SKELETON_CODE',
    payload: code
  };
};

const setNewSolutionCode = (code) => {
  return {
    type: 'SET_NEW_SOLUTION_CODE',
    payload: code
  };
};

const populateUsers = () => {
  return dispatch => {
    axios.get('/api/profiles?properties=id,firstName,lastName')
      .then(results => {
        dispatch({
          type: 'POPULATE_USERS',
          payload: results
        });
      });
  };
};

const updateSearch = (searchObj) => {
  return dispatch => {
    let searchResults = [];
    searchObj.users.forEach(prof => {
      name = prof.firstName + ' ' + prof.lastName;
      if (name.toLowerCase().includes(searchObj.value.toLowerCase())) {
        searchResults.push({
          name: name,
          id: prof.id
        });
      }
    });
    dispatch({
      type: 'UPDATE_SEARCH_RESULTS',
      payload: {
        searchResults: searchResults
      }
    });
  };
};

const addFriend = (userId, friendId, friendArray) => {
  return dispatch => {
    let friendObj = {
      profileId: userId,
      friendId: friendId,
      status: 'pending',
      updatedBy: userId
    };
    axios.post('api/friends', friendObj)
      .then(() => {
        axios.get(`/api/friends?profileId=${userProfileId}`)
          .then(result => {
            dispatch({
              type: 'POPULATE_USERS_FRIENDS',
              payload: result.data
            });
          });
      });
  };
};

const unfriend = (userId, friendId, friendArray) => {
  return dispatch => {
    let friendIndex;
    let id;
    friendArray.forEach((friend, index) => {
      if (friend.friendId === friendId) {
        friendIndex = index;
        id = friend.id;
      }
    });
    friendArray.splice(friendIndex, 1);
    axios.delete(`/api/friends/${id}`)
      .then(() => {
        axios.delete(`/api/friends/${id + 1}`);
      })
      .then(() => {
        axios.get(`/api/friends?profileId=${userProfileId}`)
          .then(result => {
            dispatch({
              type: 'POPULATE_USERS_FRIENDS',
              payload: result.data
            });
          });
      });
  };
};

const acceptFriend = (friendId, userId) => {
  return dispatch => {
    let friendObj = {
      profileId: userId,
      friendId: friendId,
      status: 'friends',
      updatedBy: userId
    };
    axios.put('api/friends', friendObj)
      .then(() => {
        axios.get(`/api/friends?profileId=${userProfileId}`)
          .then(result => {
            dispatch({
              type: 'POPULATE_USERS_FRIENDS',
              payload: result.data
            });
          });
      });
  };
};

export {
  openModal,
  closeModal,
  dashboardToSession,
  sessionToDashboard,
  updatePrompt,
  incrementCurrentTime,
  setCurrentTimeToZero,
  updateOnlineUsers,
  updateCode,
  updateCurrentSession,
  updateRoomId,
  updateButtonStatus,
  updateTestResults,
  populateUserToyProblems,
  toggleUpdateUserToyProblemModal,
  toggleNewUserToyProblemModal,
  setCurrentUserToyProblem,
  updateUserToyProblem,
  getUserToyProblemTests,
  postUserToyProblem,
  populateLeaderboard,
  populateUserData,
  populateUserSessionsData,
  populateUserFriendsData,
  endSession,
  updateUserFriendsData,
  updateToyProblemTests,
  updateSkeletonCode,
  updateSolutionCode,
  setNewSkeletonCode,
  setNewSolutionCode,
  updateCurrentQuestion,
  deleteToyProblem,
  updateSearch,
  populateUsers,
  addFriend,
  unfriend,
  acceptFriend
};