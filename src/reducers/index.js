// Import named import reducer and rename it
// formReducer from redux-form library.
// Key for this in combineReducers must be form:
import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import authReducer from "./authReducer";

export default combineReducers({
  auth: authReducer,
  form: formReducer,
});
