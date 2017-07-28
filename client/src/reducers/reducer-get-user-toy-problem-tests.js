function getUserToyProblemTests(state = [], action) {
  switch(action.type) {
    case 'GET_USER_TOY_PROBLEM_TESTS':
      return [].concat(action.payload);
      break;
  }
  return state
}

export {
  currentUserToyProblem
}