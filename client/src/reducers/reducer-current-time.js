var updateCurrentTime = function(state = "00:00:00", action) {
  var newState = "00:00:00";
  switch (action.type) {
    case 'UPDATE_CURRENT_TIME':
      newState = action.payload;
      return newState;
    default:
      return state;
  }
};

export {
  updateCurrentTime
};