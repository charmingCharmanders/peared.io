const updateCode = function(state = null, action) {
  var newState = null;
  switch (action.type) {
  case 'UPDATE_CODE':
    newState = action.payload;
    return newState;
  default:
    return state;
  }
};

export {
  updateCode
};