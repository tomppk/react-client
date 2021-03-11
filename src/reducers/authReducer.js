// Have action types as variables to make spotting errors
// and typos easier. Have all action types in one file.
import { SIGN_IN, SIGN_OUT } from "../actions/types";

// Initialized helper variable. Used all capital letters
// to indicate that this is a true constant variable
// that must never be modified
const INITIAL_STATE = {
  isSignedIn: null,
  userId: null,
};

const authReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SIGN_IN:
      return { ...state, isSignedIn: true, userId: action.payload };

    case SIGN_OUT:
      return { ...state, isSignedIn: false, userId: null };

    default:
      return state;
  }
};

export default authReducer;
