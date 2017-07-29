function toggleQuestionModal(state = false, action) {
  switch(action.type) {
    case 'OPEN_QUESTION_MODAL':
      state = true;
      break;
    case 'CLOSE_QUESTION_MODAL':
      state = false;
      break;
  }
  return state
}

export {
  toggleQuestionModal
}