function toggleModal(store = false, action) {
  switch(action.type) {
    case 'OPEN_MODAL':
      store = true;
    case 'CLOSE_MODAL':
      store = false;
    default:
      return store;
  }
  return store
}

export {
  toggleModal
}