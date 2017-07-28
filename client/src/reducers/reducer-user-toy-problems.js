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
      return state.concat(action.payload);
      break;
    default:
      return state;
  }
}

export {
  userToyProblems
}