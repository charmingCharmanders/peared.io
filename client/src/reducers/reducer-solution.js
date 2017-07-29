function updateSolutionCode(state = null, action) {
  var newState = null;
  switch(action.type) {
    case 'UPDATE_SOLUTION_CODE':
      newState = action.payload;
      return newState;
    default:
      return state;
  }
}

export {
  updateSolutionCode
}