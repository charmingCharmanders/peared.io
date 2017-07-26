import axios from 'axios';

const openModal = () => {
  console.log('inside openModal');
  return {
    type: 'OPEN_MODAL'
  };
};

const closeModal = () => {
  return {
    type: 'CLOSE_MODAL'
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

const updateRoomId = (roomId) => {
  return {
    type: 'UPDATE_ROOM_ID',
    payload: roomId
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

const updateSessionEnd = () => {
  return {
    type: 'UPDATE_SESSION_END',
    payload: userSessionsArray
  };
};

const populateUserProfileAndSessionData = () => {
  return dispatch => {
    axios.get('/loggedin')
    .then(result => {
      dispatch({
        type: 'POPULATE_USER_PROFILE_DATA',
        payload: result.data
      });
      return result;
    })
    .then((result) => {
      let id = result.data.id;
      axios.get(`/api/profiles/${id}/sessions`)
      .then(result => {
        let sessionInfo = [];
        result.data.forEach((session) => {
          let minutes = Math.floor((Date.parse(session.endedAt) - Date.parse(session.startedAt))/60000)
          let seconds = Math.floor((((Date.parse(session.endedAt) - Date.parse(session.startedAt))/60000) - minutes) * 60);
          let lengthOfTime;
          if (seconds < 10) {
            lengthOfTime = minutes.toString() + ':0' + seconds.toString();
          } else {
            lengthOfTime = minutes.toString() + ':' + seconds.toString();
          }
          if (session.profile1.id === id) {
            let name = session.profile2.firstName + " " + session.profile2.lastName
            sessionInfo.push([name, session.prompt.name, lengthOfTime, session.prompt.category]);
          } else {
            let name = session.profile1.firstName + " " + session.profile1.lastName
            sessionInfo.push([name, session.prompt.name, lengthOfTime, session.prompt.category]);
          }
        })
        dispatch({
          type: 'POPULATE_USER_SESSIONS',
          payload: sessionInfo
        })
      })
      .then(() => {
        axios.get(`/api/friends?profileId=${id}`)
        .then(result => {
          console.log('friends results**********', result);
          dispatch({
            type: 'POPULATE_USERS_FRIENDS',
            payload: result.data
          })
        })
      })
    })
  };
};

export {
  openModal,
  closeModal,
  dashboardToSession,
  sessionToDashboard,
  updatePrompt,
  updateCode,
  updateRoomId,
  updateButtonStatus,
  updateTestResults,
  populateUserProfileAndSessionData,
  updateSessionEnd
};


// Action Creator Function
  // Returns an Action which is an OBJECT
    // The action has 2 props: a Type and a Payload