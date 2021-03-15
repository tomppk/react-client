import _ from "lodash";
import React from "react";
import { connect } from "react-redux";
import { fetchStream, editStream } from "../../actions";
import StreamForm from "./StreamForm";

// StreamEdit component has access to react-router-dom props
// because in App.js it is being rendered by Route
// component. React-router-dom provides it with set of
// default props when it gets rendered onto the screen.
class StreamEdit extends React.Component {
  componentDidMount() {
    this.props.fetchStream(this.props.match.params.id);
  }

  // editStream() action takes in (id, formValues)
  // formValues are the values inside the StreamForm
  // component's fields. We set them below as initialValues
  onSubmit = (formValues) => {
    this.props.editStream(this.props.match.params.id, formValues);
  };

  render() {
    if (!this.props.stream) {
      return <div>Loading...</div>;
    }

    // Redux-Form special property name initialValues
    // Passes values to form component wrapped in redux
    // form. Pass in object with field names as keys and
    // initial values to show in form fields. Our stream
    // object has {title: 'bla', description: 'bla'}
    return (
      <div>
        <h3>Edit a Stream</h3>
        {/* Use lodash to pick out just the properties we want to pass on as initial values instead of the whole object. Returns new object with the listed properties */}
        <StreamForm
          initialValues={_.pick(this.props.stream, "title", "description")}
          onSubmit={this.onSubmit}
        />
      </div>
    );
  }
}

// Use mapStateToProps and connect() to get access to our
// Redux state store. mapStateToProps always has access to
// two arguments: Redux store state, and the props object
// of the component to access props passed to it.
// We find correct stream from state store accessing its key
// of id
const mapStateToProps = (state, ownProps) => {
  return { stream: state.streams[ownProps.match.params.id] };
};

export default connect(mapStateToProps, { fetchStream, editStream })(
  StreamEdit
);
