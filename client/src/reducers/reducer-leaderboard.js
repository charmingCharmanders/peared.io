function populateLeaderboard(state = {}, action) {
  switch (action.type) {
    case 'POPULATE_LEADERBOARD':
      return Object.assign({}, state,
      {
        leaderArray: action.payload
      });
    default:
      return state;
  }
}

export {
  populateLeaderboard
}