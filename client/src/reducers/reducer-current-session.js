const updateCurrentSession = function (state = {}, action) {
  switch (action.type) {
  case 'UPDATE_CURRENT_SESSION':
    if (action.payload === null) {
      return {};
    } else {
      return Object.assign({}, state, 
        {
          profileId1: action.payload.profileId1,
          profileId2: action.payload.profileId2,
          prompt: action.payload.prompt,
          rating: action.payload.rating,
          roomId: action.payload.roomId,
          code: action.payload.code,
          startedAt: action.payload.startedAt,
          testResults: action.payload.testResults
        });
    }
  default:
    return state;
  }
};

export {
  updateCurrentSession
};
