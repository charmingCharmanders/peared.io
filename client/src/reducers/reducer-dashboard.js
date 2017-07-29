const toggleDashboard = function(state = true, action) {
  switch (action.type) {
  case 'DASHBOARD_TO_SESSION':
    state = false;
    break;
  case 'SESSION_TO_DASHBOARD':
    state = true;
    break;
  }
  return state;
};

export {
  toggleDashboard
};