import { SIGN_IN, SIGN_OUT } from "./types";

// Receives Google user Id from GoogleAuth.js component
export const signIn = (userId) => {
  return {
    type: SIGN_IN,
    payload: userId,
  };
};

export const signOut = () => {
  return {
    type: SIGN_OUT,
  };
};
