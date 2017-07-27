var updateOnlineUsers = function(state = 0, action) {
  switch (action.type) {
    case 'UPDATE_ONLINE_USERS':
      return Object.assign({}, state, action.payload);
    default:
      return state;
  }
}

export {
  updateOnlineUsers
};