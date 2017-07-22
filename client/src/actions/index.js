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

export {
  openModal, 
  closeModal, 
  dashboardToSession, 
  sessionToDashboard, 
  updatePrompt, 
  updateCode,
  updateRoomId,
  updateButtonStatus,
  updateTestResults
};

// Action Creator Function
  // Returns an Action which is an OBJECT
    // The action has 2 props: a Type and a Payload