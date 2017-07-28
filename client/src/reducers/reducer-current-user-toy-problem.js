function currentUserToyProblem(state = {}, action) {
  switch(action.type) {
    case 'SET_CURRENT_USER_TOY_PROBLEM':
      return Object.assign({}, action.payload)
      break;
    case 'GET_USER_TOY_PROBLEM_TESTS':
      return Object.assign({}, state, {tests: action.payload});
      break;
  }
  return state
}

export {
  currentUserToyProblem
}