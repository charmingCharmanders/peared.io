function updateUsersFriends(state = {}, action) {
  switch (action.type) {
    case 'POPULATE_USERS_FRIENDS':
      return Object.assign({}, state,
      {
        friendArray: action.payload
      });
    default:
      return state;
  }
}

export {
  updateUsersFriends
}