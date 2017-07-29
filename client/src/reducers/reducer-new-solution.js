function setNewSolutionCode(state = 'const functionName = function() {}', action) {
  var newState = null;
  switch(action.type) {
    case 'SET_NEW_SOLUTION_CODE':
      newState = action.payload;
      return newState;
    default:
      return state;
  }
}

export {
  setNewSolutionCode
}