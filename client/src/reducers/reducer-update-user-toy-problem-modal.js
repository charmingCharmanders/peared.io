function updateUserToyProblemModal(state = false, action) {
  switch(action.type) {
    case 'TOGGLE_UPDATE_USER_TOY_PROBLEM_MODAL':
      state = action.payload;
      break;
  }
  return state
}

export {
  updateUserToyProblemModal
}