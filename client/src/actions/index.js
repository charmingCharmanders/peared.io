let userProfileId;

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
    // dispatch({
    //   type: 'END_SESSION',
    //   payload: sessions.push(session)
    // });

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
  updateCurrentSession,
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

