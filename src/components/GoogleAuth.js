// Reference component for whole Google OAuth process
// to refer back to when making your own Google OAuth
// client-side authentication

import React from "react";
import { connect } from "react-redux";
import { signIn, signOut } from "../actions";

// When Google Api library installed (script in index.html)
// can call gapi property on window to load additional
// Google Api functionality.
// Loads up client portion of authentication library.
// Makes request to Googles servers and receives Javascript
// code for library.
// Second argument is callback to run after response is
// received and data loaded.
// We initialize client auth library by giving it object
// with keys clientId: our Google Api token,
// scope: what information we want from user.
// .init returns a promise and we chain on .then and
// a callback to run when promise is resolved and client
// library successfully initialized.

// At component initialization:
// Assign component property this.auth reference to Auth
// object that gives us access to methods to sign user in
// and out and check whether user is signed in.
// Call component's method onAuthChange and pass in
// this.auth.isSignedIn.get() that is Auth object's
// method isSignedIn.get() to get true or false whether user
// is signed in. Based on value of true or false
// onAuthChange() calls action creator this.props.signIn()
// or signOut() to update our Redux stores state.
// Auth object's method .listen() listens for anytime
// a users authentication status changes and invokes
// callback function.

class GoogleAuth extends React.Component {
  componentDidMount() {
    window.gapi.load("client:auth2", () => {
      window.gapi.client
        .init({
          clientId: process.env.REACT_APP_CLIENT_ID,
          scope: "email",
        })
        .then(() => {
          this.auth = window.gapi.auth2.getAuthInstance();

          this.onAuthChange(this.auth.isSignedIn.get());
          this.auth.isSignedIn.listen(this.onAuthChange);
        });
    });
  }

  // Use arrow function so 'this' context is bound to
  // instance of this component. Use arrow functions
  // when you know function is used as callback for
  // other functions.
  // This callback gets called with boolean argument true
  // or false depending on whether user is signed in. This
  // boolean argument is received from Google api
  // this.auth.isSignedIn.listen() that invokes this
  // on AuthChange callback.
  // Depending on whether isSignedIn is true or false we
  // will execute signIn or signOut action creator from
  // this.props that is passed to this component in
  // connect().
  // Action creators will be passed in the Google Id of
  // currently signed in user by calling Auth objects
  // property currentUser's methods get().getId()
  // Action creator will receive the Google Id of user
  // and pass it on to our reducers as action payload
  // property. Reducers will use it to update our Redux
  // store state.
  onAuthChange = (isSignedIn) => {
    if (isSignedIn) {
      this.props.signIn(this.auth.currentUser.get().getId());
    } else {
      this.props.signOut(this.auth.currentUser.get().getId());
    }
  };

  onSignInClick = () => {
    this.auth.signIn();
  };

  onSignOutClick = () => {
    this.auth.signOut();
  };

  renderAuthButton() {
    if (this.props.isSignedIn === null) {
      return null;
    } else if (this.props.isSignedIn) {
      return (
        <button onClick={this.onSignOutClick} className="ui red google button">
          <i className="google icon" />
          Sign Out
        </button>
      );
    } else {
      return (
        <button onClick={this.onSignInClick} className="ui red google button">
          <i className="google icon" />
          Sign In With Google
        </button>
      );
    }
  }

  render() {
    return <div>{this.renderAuthButton()}</div>;
  }
}

const mapStateToProps = (state) => {
  return { isSignedIn: state.auth.isSignedIn };
};

export default connect(mapStateToProps, { signIn, signOut })(GoogleAuth);
