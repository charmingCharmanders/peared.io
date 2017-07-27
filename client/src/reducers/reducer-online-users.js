var updateOnlineUsers = function(state = 0, action) {
  var newState = 0;
  switch (action.type) {
    case 'UPDATE_ONLINE_USERS':
      newState = action.payload;
      return newState;
    default:
      return state;
  }
}

export {
  updateOnlineUsers
};