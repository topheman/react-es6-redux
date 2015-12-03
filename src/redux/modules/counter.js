/**
 * For annotated version of a module managing action creators & reducers,
 * checkout src/redux/modules/multipleUsers.js
 */

const INCREMENT = 'counter/INCREMENT';

/* *********** Reducer ************/

export default function reducer(state = 0, action = {}) {
  switch (action.type) {
    case INCREMENT:
      return state + 1;
    default:
      return state;
  }
}

/* *********** Action creators ************/

export function increment() {
  return {
    type: INCREMENT
  };
}
