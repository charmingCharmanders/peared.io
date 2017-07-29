function updateCurrentQuestion(state = null, action) {
  var newState = null;
  switch(action.type) {
    case 'UPDATE_CURRENT_QUESTION':
      newState = action.payload;
      return newState;
    default:
      return state;
  }
}

export {
  updateCurrentQuestion
}