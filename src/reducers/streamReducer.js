// Without key interpolation syntax:
// const newState = {...state};
// newState[action.payload.id] = action.payload;
// return newState;

// Same as above but written with shorter syntax:
// return {...state, [action.payload.id]: action.payload}

// [] inside object is key interpolation. Similar to `${}`
// We want to insert a key at this spot when the code runs
// but we do not know the specific key ahead of time.

import _ from "lodash";
import {
  CREATE_STREAM,
  FETCH_STREAM,
  FETCH_STREAMS,
  DELETE_STREAM,
  EDIT_STREAM,
} from "../actions/types";

// We get back a single record from our API. We take
// old state and add it to new object and add new single
// record to object to add to Redux state store
const streamReducer = (state = {}, action) => {
  switch (action.type) {
    // lodash method to map array of objects into
    // new object. Takes in array and value to be
    // used as keys in new object.
    // Take array of streams from action.payload. Map
    // them into a new object using stream 'id' as keys.
    // Then spread that that new object containing streams.
    case "FETCH_STREAMS":
      return { ...state, ..._.mapKeys(action.payload, "id") };

    case "FETCH_STREAM":
      return { ...state, [action.payload.id]: action.payload };

    case "CREATE_STREAM":
      return { ...state, [action.payload.id]: action.payload };

    case "EDIT_STREAM":
      return { ...state, [action.payload.id]: action.payload };

    // Use lodash method omit to create new object from
    // our old state object and omitting second argument.
    // First argument old state object that we copy, second
    // argument key we want to omit. For delete action
    // payload contains only id. See actions index.js
    case "DELETE_STREAM":
      return _.omit(state, action.payload);

    default:
      return state;
  }
};

export default streamReducer;
