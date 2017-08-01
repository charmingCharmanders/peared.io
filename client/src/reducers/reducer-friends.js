const updateUsersFriends = function(state = [], action) {
  switch (action.type) {
  case 'POPULATE_USERS_FRIENDS':
    var friends = action.payload.map((friend)=>{
      friend.online = false;
      friend.inRoom = false;
      return friend;
    })
    return Object.assign([], state, friends);
  default:
    return state;
  }
};

export {
  updateUsersFriends
};