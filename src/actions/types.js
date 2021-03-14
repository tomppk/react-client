// Single file to have all the action types as variables.
// These are used both the action creators and reducers.
// Having actions as variables imported variables makes
// spotting errors and typos easier than if they were
// plain strings.

export const SIGN_IN = "SIGN_IN";
export const SIGN_OUT = "SIGN_OUT";
export const CREATE_STREAM = "CREATE_STREAM";
export const FETCH_STREAM = "FETCH_STREAM";
export const FETCH_STREAMS = "FETCH_STREAMS";
export const DELETE_STREAM = "DELETE_STREAM";
export const EDIT_STREAM = "EDIT_STREAM";
