function populateUsers(state = {}, action) {
  switch (action.type) {
    case 'POPULATE_USERS':
      return Object.assign({}, state,
      {
        data: action.payload
      });
    default:
      return state;
  }
}

export {
  populateUsers
}