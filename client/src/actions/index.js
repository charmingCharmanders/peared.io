// const selectUser = () => {
//   console.log('You clicked on');
//   return {
//     // Type can be anything you want
//     type:  "USER_SELECTED",
//     // payload can be anything. you can call it 'data' if you want.
//     payload: 'payload'
//   }
// }

const openModal = () => {
  console.log('inside openModal');
  return {
    type: 'OPEN_MODAL'
  }
}

const closeModal = () => {
  return {
    type: 'CLOSE_MODAL'
  }
}

export {
  openModal, closeModal
}

// Action Creator Function
  // Returns an Action which is an OBJECT
    // The action has 2 props: a Type and a Payload