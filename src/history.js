// Here we create our own Browser History object for
// routing and redirecting. Default history object
// created by BrowserRouter but to get access to that
// object from outside is difficult. So we create our own.
// Import history library from react-router-dom and from
// that library the createBrowserHistory method that
// creates a new history object.
// Then we just call the method to create history object.

// Because we have our own history object we do not need
// React-Router to create default history which it
// automatically does if we use BrowserRouter
// (or any other router besides plain Router). Therefore
// we use just plain Router.
import { createBrowserHistory } from "history";

export default createBrowserHistory();
