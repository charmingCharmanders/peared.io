function updateRoomId(state = null, action) {
  var newState = null;
  switch(action.type) {
    case 'UPDATE_ROOM_ID':
      newState = action.payload;
      return newState;
    default:
      return state;
  }
}

export {
  updateRoomId
}