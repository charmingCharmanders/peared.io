function updateSessionsData(state = {}, action) {
  switch(action.type) {
    case 'POPULATE_USER_SESSIONS':
      return Object.assign({}, state, {
        sessionArray: action.payload
      });
    case 'START_SESSION':
      return Object.assign({}, state, {
        currentSession: action.payload
      });
    case 'END_SESSION':
      return Object.assign({}, state, {
        sessionArray: action.payload,
        currentSession: ''
      });
    default:
      return state;
  }
}

export {
  updateSessionsData
}