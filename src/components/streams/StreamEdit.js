import React from "react";
import { connect } from "react-redux";

// StreamEdit component has access to react-router-dom props
// because in App.js it is being rendered by Route
// component. React-router-dom provides it with set of
// default props when it gets rendered onto the screen.
const StreamEdit = (props) => {
  console.log(props);
  return <div>StreamEdit</div>;
};

// Use mapStateToProps and connect() to get access to our
// Redux state store. mapStateToProps always has access to
// two arguments: Redux store state, and the props object
// of the component to access props passed to it.
// We find correct stream from state store accessing its key
// of id
const mapStateToProps = (state, ownProps) => {
  return { stream: state.streams[ownProps.match.params.id] };
};

export default connect(mapStateToProps)(StreamEdit);
