const updateSkeletonCode = (state = 'const functionName = function() {}', action) => {
  var newState;
  switch (action.type) {
  case 'UPDATE_SKELETON_CODE':
    newState = action.payload;
    return newState;
  case 'SET_INITIAL_SKELETON_CODE':
    newState = action.payload;
    return newState;
  case 'SET_CURRENT_USER_TOY_PROBLEM':
    newState = action.payload.skeletonCode;
    return newState;
  default:
    return state;
  }
}

export {
  updateSkeletonCode
};