const updateUsersFriends = function(state = [], action) {
  switch (action.type) {
  case 'POPULATE_USERS_FRIENDS':
    return Object.assign([], state, action.payload);
  default:
    return state;
  }
};

export {
  updateUsersFriends
};