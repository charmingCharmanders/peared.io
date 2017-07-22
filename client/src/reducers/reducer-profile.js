function updateUserProfileData(state = {}, action) {
  switch(action.type) {
    case 'POPULATE_USER_PROFILE_DATA':
      return Object.assign({}, state, {
        id: action.payload.id,
        firstName: action.payload.firstName,
        lastName: action.payload.lastName,
        emailAddress: action.payload.emailAddress,
        rating: action.payload.rating,
        createdAt: action.payload.createdAt,
        updatedAt: action.payload.updatedAt
      });
    default:
      return state;
  }
}

export {
  updateUserProfileData
}