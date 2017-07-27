const updateCurrentSession = function (state = {}, action) {
  switch (action.type) {
  case 'UPDATE_CURRENT_SESSION':
    if (action.payload === null) {
      return Object.assign({}, state, {});
    } else {
      return Object.assign({}, state, 
        {
          profileId1: action.payload.profileId1,
          profileId2: action.payload.profileId2,
          prompt: action.payload.prompt,
          roomId: action.payload.roomId
        });
    }
  default:
    return state;
  }
};

export {
  updateCurrentSession
};
