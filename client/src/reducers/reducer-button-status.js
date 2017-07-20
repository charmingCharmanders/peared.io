function updateButtonStatus(state = true , action) {
  var newState;
  switch(action.type) {
    case 'ENABLE_START_SESSION_BUTTON':
      newState = !state;
      return newState;
    default:
      return state;
  };
}

export {
  updateButtonStatus
}
