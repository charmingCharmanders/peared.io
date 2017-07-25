function toggleDashboard(state = true, action) {
  var newState = '';
  switch(action.type) {
    case 'DASHBOARD_TO_SESSION':
      newState = false;
      return newState
      break;
    default:
      return state;
  }
}

export {
  toggleDashboard
}