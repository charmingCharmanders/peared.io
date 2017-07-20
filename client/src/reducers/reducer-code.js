function updateCode(state = '', action) {
  var newState = '';
  switch(action.type) {
    case 'UPDATE_CODE':
      newState = action.payload;
      return newState
      // state = action.payload
      break;
    default:
      return state
  }
}

export {
  updateCode
}