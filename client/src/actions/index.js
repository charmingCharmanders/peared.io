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

const updateButtonStatus = () => {
  return {
    type: 'ENABLE_START_SESSION_BUTTON',
  };
};

const updateTestResults = (testResults) => {
  return {
    type: 'UPDATE_TEST_RESULTS',
    payload: testResults
  };
};

const populateUserSessions = (userSessionsArray) => {
  return dispatch => {
    axios.get('/api/profiles/3/sessions')
      .then(result => {
        dispatch({
          type: 'POPULATE_USER_SESSIONS',
          payload: result.data
      });
    });
  };
};

const updateSessionEnd = () => {
  return {
    type: 'UPDATE_SESSION_END',
    payload: userSessionsArray
  };
};

const populateUserProfileData = () => {
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
              if (session.profile1.id === id) {
                let name = session.profile2.firstName + " " + session.profile2.lastName;
                sessionInfo.push([name, session.prompt.name, '**insert time here**', session.prompt.category]);
              } else {
                let name = session.profile1.firstName + " " + session.profile1.lastName
                sessionInfo.push([name, session.prompt.name, '**insert time here**', session.prompt.category]);
              }
            })
            dispatch({
              type: 'POPULATE_USER_SESSIONS',
              payload: sessionInfo
            });
        });
      })
  }
}

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
  populateUserProfileData,
  populateUserSessions,
  updateSessionEnd
}