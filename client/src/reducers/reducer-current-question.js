function updateCurrentQuestion(state = 0, action) {
  var newState = 0;
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