const userToyProblems = (state = [], action) => {
  switch (action.type) {
  case 'POPULATE_USER_TOY_PROBLEMS':
    return [].concat(action.payload);
    break;
  case 'UPDATE_USER_TOY_PROBLEMS':
    var result = [];

    for (let i = 0; i < state.length; i++) {
      if (state[i].id === action.payload.id) {
        var obj = {};
        obj.name = action.payload.name;
        obj.description = action.payload.description;
        obj.category = action.payload.category;
        obj.difficulty = action.payload.difficulty;
        obj.updatedAt = action.payload.updatedAt;
        obj.skeletonCode = action.payload.skeletonCode;
        obj.solutionCode = action.payload.solutionCode;

        obj.id = state[i].id;
        obj.createdAt = state[i].createdAt;
        obj.hint = state[i].hint;
        obj.key = state[i].key;
        obj.userId = state[i].userId;

        result.push(obj);
      } else {
        result.push(state[i]);
      }
    }
    return result;
    break;
  case 'POST_USER_TOY_PROBLEM':
    let toy = action.newToyProblem;
    toy.tests = [];
    toy.tests.push(action.newToyProblemTest);
    return state.concat(toy);
    break;
  case 'UPDATE_TOY_PROBLEM_TESTS':

    for (let i = 0; i < state.length; i++) {
      if (state[i].id === action.payload[0].promptId) {
        state[i].tests = action.payload;
      }
    }

    return state;
    break;
  case 'DELETE_TOY_PROBLEM':
    let resultArr = [];

    for (let i = 0; i < state.length; i++) {
      if (state[i].id !== action.payload) {
        resultArr.push(state[i]);
      }
    }

    return resultArr;
    break;
  default:
    return state;
  }
};

export {
  userToyProblems
};