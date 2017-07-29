const updateTestResults = function(state = {
  error: null,
  testsCount: 0,
  testsPassed: 0,
  tests: []
}, action) {
  switch (action.type) {
  case 'UPDATE_TEST_RESULTS':
    if (action.payload === null) {
      return {
        error: null,
        testsCount: 0,
        testsPassed: 0,
        tests: []
      };
    } else {
      return Object.assign({}, state, action.payload);
    }
  default:
    return state;
  }
};

export {
  updateTestResults
};
