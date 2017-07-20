export default function(store = null, action) {
  switch(action.type) {
    case 'USER_SELECTED':
      // state.user.push({name: 'will'})
      store = 'steve';
      // return action.payload;
      break;
  }
  return store;
}




// var a = Object.assign({}, state, {
//   visibilityFilter: action.filter
// }

// b.things = a.things.concat(value);

// state = {..state, age: action.payload}



// Change object value:
  // return Object.assign({}, state, {prop: 'value'})

// Change Array value:
  // return store.array.concat(val);