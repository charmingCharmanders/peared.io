function setNewSkeletonCode(state = 'const functionName = function() {}', action) {
  var newState = null;
  switch(action.type) {
    case 'SET_NEW_SKELETON_CODE':
      newState = action.payload;
      return newState;
    default:
      return state;
  }
}

export {
  setNewSkeletonCode
}