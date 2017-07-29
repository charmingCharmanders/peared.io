function userToyProblems(state = [], action) {
  switch(action.type) {
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
          obj.id = action.payload.id;

          obj.createdAt = state[i].createdAt;
          obj.hint = state[i].hint;
          obj.key = state[i].key;
          obj.rating = state[i].rating;
          obj.skeletonCode = state[i].skeletonCode;
          obj.solutionCode = state[i].solutionCode;
          obj.userId = state[i].userId;

          result.push(obj)
        } else result.push(state[i])
      }
      return result
      break;
    case 'POST_USER_TOY_PROBLEM':
      let toy = action.newToyProblem;
      toy.tests = [];
      toy.tests.push(action.newToyProblemTest);
      return state.concat(toy);
      break;
    case 'UPDATE_TOY_PROBLEM_TESTS':
      // let result = [];

      for (let i = 0; i < state.length; i++) {
        if (state[i].id === action.payload[0].promptId) {
          state[i].tests = action.payload
        }
      }

      // for (let i = 0; i < state.length; i++) {
      //   if (state[i].id !== action.payload.promptId) {
      //     result.push(state[i])
      //   } else {
      //     for (let j = 0; j < state.tests.length; j++) {
      //       if (state.tests[j].id === action.payload.id) {
      //         state.tests[j] = action.payload;
      //       }
      //     }
      //     result.push(state[i]);
      //   }
      // }

      return state;
      break;
    default:
      return state;
  }
}

export {
  userToyProblems
}