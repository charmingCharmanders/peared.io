function toggleModal(state = false, action) {
  switch(action.type) {
    case 'OPEN_MODAL':
      state = true;
      break;
    case 'CLOSE_MODAL':
      state = false;
      break;
  }
  return state
}

export {
  toggleModal
}