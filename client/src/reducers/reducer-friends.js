function updateUsersFriends(state = {}, action) {
  switch (action.type) {
    case 'POPULATE_USERS_FRIENDS':
      let friendArray = action.payload.map((friend)=>{
        friend.online = false;
        friend.inRoom = false;
        return friend;
      })
      return Object.assign({}, state,
      {
        friendArray: friendArray
      });
    default:
      return state;
  }
}

export {
  updateUsersFriends
}