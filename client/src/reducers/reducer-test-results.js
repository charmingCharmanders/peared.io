const updateTestResults = function(state = {
  error: null,
  testsCount: 0,
  testsPassed: 0,
  tests: []
}, action) {
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
