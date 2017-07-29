function updateSkeletonCode(state = null, action) {
  var newState = null;
  switch(action.type) {
    case 'UPDATE_SKELETON_CODE':
      newState = action.payload;
      return newState;
    default:
      return state;
  }
}

export {
  updateSkeletonCode
}