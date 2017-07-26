function updateButtonStatus(state = true , action) {
  var newState = state;
  switch(action.type) {
    case 'UPDATE_START_SESSION_BUTTON':
      newState = action.payload;
      return newState;
    default:
      return state;
  };
};

export {
  updateButtonStatus
};
