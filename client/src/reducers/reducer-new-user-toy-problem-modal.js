function newUserToyProblemModal(state = false, action) {
  switch(action.type) {
    case 'TOGGLE_NEW_USER_TOY_PROBLEM_MODAL':
      state = action.payload;
      break;
  }
  return state
}

export {
  newUserToyProblemModal
}