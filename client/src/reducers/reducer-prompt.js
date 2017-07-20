function updatePrompt(state = {}, action) {
  switch(action.type) {
    case 'SAVE_PROMPT':
      return Object.assign({}, state, action.payload);
      // return {...state, action.payload};
      break;
    default:
      return state;
  }
}

export {
  updatePrompt
}