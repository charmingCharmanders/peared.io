function updateSessionsData(state = {}, action) {
  switch(action.type) {
    case 'POPULATE_USER_SESSIONS':
      return Object.assign({}, state, {
        sessionArray: action.payload
      });
    case 'UPDATE_SESSION_END':
      return Object.assign({}, state, {
        endedAt: action.payload.endedAt
      });
    default:
      return state;
  }
}

export {
  updateSessionsData
}