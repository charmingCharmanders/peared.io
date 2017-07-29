const toggleModal = (state = {
  show: false,
  type: null
}, action) => {
  switch (action.type) {
  case 'OPEN_MODAL':
    state = {
      show: true,
      type: action.payload
    };
    break;
  case 'CLOSE_MODAL':
    state = {
      show: false,
      type: null
    };
    break;
  }
  return state;
};

export {
  toggleModal
};
