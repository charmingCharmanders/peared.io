const openModal = () => {
  console.log('inside openModal');
  return {
    type: 'OPEN_MODAL'
  }
}

const closeModal = () => {
  return {
    type: 'CLOSE_MODAL'
  }
}

const dashboardToSession = () => {
  return {
    type: 'DASHBOARD_TO_SESSION'
  }
}

const sessionToDashboard = () => {
  return {
    type: 'SESSION_TO_DASHBOARD'
  }
}

export {
  openModal, closeModal, dashboardToSession, sessionToDashboard
}

// Action Creator Function
  // Returns an Action which is an OBJECT
    // The action has 2 props: a Type and a Payload