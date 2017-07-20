function updatePrompt(state = {}, action) {
  switch(action.type) {
    case 'UPDATE_PROMPT':
      return Object.assign({}, state, {
        name: action.payload.name,
        category: action.payload.category,
        description: action.payload.description,
        hint: action.payload.hint,
        skeletonCode: action.payload.skeletonCode,
        solutionCode: action.payload.solutionCode,
      });
    default:
      return state;
  }
}

export {
  updatePrompt
}