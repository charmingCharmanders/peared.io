function updatePartnerData(state = {}, action) {
  switch (action.type) {
    case 'UPDATE_PARTNER_DATA':
      return Object.assign({}, state, action.payload);
    default:
      return state;
  }
}

export {
  updatePartnerData
}