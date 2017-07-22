const updateTestResults = function(state = {}, action) {
  switch (action.type) {
  case 'UPDATE_TEST_RESULTS':
    return Object.assign({}, state, action.payload);
  default:
    return state;
  }
};

export {
  updateTestResults
};
