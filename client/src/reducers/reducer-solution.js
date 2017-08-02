const updateSolutionCode = (state = 'const functionName = function() {}', action) => {
  var newState = null;
  switch (action.type) {
  case 'UPDATE_SOLUTION_CODE':
    newState = action.payload;
    return newState;
  case 'SET_INITIAL_SOLUTION_CODE':
    newState = action.payload;
    return newState;
  case 'SET_CURRENT_USER_TOY_PROBLEM':
    newState = action.payload.solutionCode;
    return newState;
  default:
    return state;
  }
};

export {
  updateSolutionCode
};