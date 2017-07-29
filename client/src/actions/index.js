let userProfileId;
let partnerId;
let sessionId;
let sessionStartTime;

const helpers = require('./helpers');
import axios from 'axios';

const openModal = () => {
  return {
    type: 'OPEN_MODAL'
  };
};

const closeModal = () => {
  return {
    type: 'CLOSE_MODAL'
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

const updateRoomId = (roomId) => {
  return {
    type: 'UPDATE_ROOM_ID',
    payload: roomId
  };
};

const updateOnlineUsers = (userCount) => {
  console.log("users count is:", userCount);
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
  var result = "00:00:00";
  result = helpers.generateNewTime(...currentTime.split(':'));
  return {
    type: 'UPDATE_CURRENT_TIME',
    payload: result
  };
};

const setCurrentTimeToZero = () => {
  return {
    type: 'UPDATE_CURRENT_TIME',
    payload: "00:00:00"
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
          }
      });
      dispatch({
        type: 'POPULATE_LEADERBOARD',
        payload: ratingArray
      })
    })
  }
}

const populateUserProfileFriendsAndSessionData = () => {
  return dispatch => {
    return axios.get('/loggedin')
    .then(result => {
      dispatch({
        type: 'POPULATE_USER_PROFILE_DATA',
        payload: result.data
      });
      return result;
    })
    .then((result) => {
      userProfileId = result.data.id;
      axios.get(`/api/profiles/${userProfileId}/sessions`)
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
        })
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
    });
  };
};

const startSession = ({profileId1, profileId2, prompt}) => {
  return dispatch => {
    dispatch({
      type: 'START_SESSION',
      payload: {
        profileId1: profileId1,
        profileId2: profileId2,
        promptId: prompt.id,
        difficulty: prompt.difficulty
      }
    })
    sessionStartTime = Date();
    axios.post('/api/sessions', {
      profileId1: profileId1,
      profileId2: profileId2,
      promptId: prompt.id
    })
    .then(result => {
      sessionId = result.data.id;
      Number(result.data.profileId1) === userProfileId ? partnerId = result.data.profileId2 : partnerId = result.data.profileId1;
    })
    .catch(err => {
      console.log(err);
    })
  }
}

const endSession = (userSessionsArray, currentSessionObject) => {
  userSessionsArray.push(currentSessionObject);
  return dispatch => {
    dispatch({
      type: 'END_SESSION',
      payload: userSessionsArray
    })
    axios.get(`/api/profiles/${userProfileId}`)
    .then((result) => {
      let sessionEndTime = new Date();
      let sessionScore = helpers.calculateSessionScore(3600, (Date.parse(sessionEndTime) - Date.parse(sessionStartTime))/1000, currentSessionObject.difficulty, currentSessionObject.numberOfTests, currentSessionObject.numberOfTestsPassed);
      let newRating;
      if (result.data.rating === null || result.data.rating === NaN) {
        newRating = sessionScore;
      } else {
        newRating = sessionScore + result.data.rating;
      }
      axios.put(`/api/profiles/${userProfileId}`, {
        rating: Math.floor(newRating)
      })
      .then(() => {
        axios.get(`/api/profiles/${partnerId.toString()}`)
        .then(results => {
          if (!results.data.rating) {
            newRating = sessionScore;
          } else {
            newRating = sessionScore + results.data.rating;
          }
          axios.put(`/api/profiles/${partnerId}`, {
            rating: Math.floor(newRating)
          })
          .then(() => {
            axios.put(`/api/sessions/${sessionId}`, {
              endedAt: sessionEndTime,
              solutionCode: 'solution code here', //currentSessionObject.solutionCode,
              rating: Math.round(sessionScore),
              numberOfTests: 'tests here', //currentSessionObject.numberOfTests,
              numberOfTestsPassed: 'tests passed here' //currentSessionObject.numberOfTestsPassed
            });
          });
        });
      });
    });
  }
};

export {
  openModal,
  closeModal,
  openQuestionModal,
  closeQuestionModal,
  dashboardToSession,
  sessionToDashboard,
  updatePrompt,
  incrementCurrentTime,
  setCurrentTimeToZero,
  updateOnlineUsers,
  updateCode,
  updateRoomId,
  updateButtonStatus,
  updateTestResults,
  populateLeaderboard,
  populateUserProfileFriendsAndSessionData,
  startSession,
  endSession,
  updateCurrentQuestion
};


// Action Creator Function
  // Returns an Action which is an OBJECT
    // The action has 2 props: a Type and a Payload

