import streams from "../apis/streams";
import history from "../history";
import {
  SIGN_IN,
  SIGN_OUT,
  CREATE_STREAM,
  FETCH_STREAM,
  FETCH_STREAMS,
  DELETE_STREAM,
  EDIT_STREAM,
} from "./types";

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

// Receives list of all the different values entered into
// our form on StreamCreate.js
// Make POST request with axios and send our formValues to
// JSON-server. We await response from server for our POST
// request.
// Redux-Thunk gives access also to getState function. We
// get auth property from our Redux state store and
// destructure userId (Google OAuth userId property).
// We post new object to our api with form values and
// add in userId as well.
export const createStream = (formValues) => async (dispatch, getState) => {
  const { userId } = getState().auth;
  const response = await streams.post("/streams", { ...formValues, userId });
  // After we get our response dispatch action to reducers
  // with our response.data
  dispatch({ type: CREATE_STREAM, payload: response.data });
  // After response and dispatch we redirect user back to
  // the root route (called programmatic navigation). We
  // use our own history object's method push to navigate
  // user around. Built-in method of react-router-dom
  // history object.
  history.push("/");
};

// Arrow function that returns a Redux-Thunk function
export const fetchStreams = () => async (dispatch) => {
  const response = await streams.get("/streams");

  dispatch({ type: FETCH_STREAMS, payload: response.data });
};

export const fetchStream = (id) => async (dispatch) => {
  const response = await streams.get(`/streams/${id}`);

  dispatch({ type: FETCH_STREAM, payload: response.data });
};

// formValues are the updates we want to make
// PATCH request updates only some of the properties
// PUT request replaces all of the properties
export const editStream = (id, formValues) => async (dispatch) => {
  const response = await streams.patch(`/streams/${id}`, formValues);

  dispatch({ type: EDIT_STREAM, payload: response.data });

  history.push("/");
};

export const deleteStream = (id) => async (dispatch) => {
  await streams.delete(`/streams/${id}`);

  dispatch({ type: DELETE_STREAM, payload: id });

  history.push("/");
};
