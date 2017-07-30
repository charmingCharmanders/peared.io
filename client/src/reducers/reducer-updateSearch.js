function updateSearch(state = {}, action) {
  switch (action.type) {
    case 'UPDATE_SEARCH_RESULTS':
      return Object.assign({}, state,
      {
        searchResults: action.payload
      });
    default:
      return {searchResults: ''};
  }
}

export {
  updateSearch
}