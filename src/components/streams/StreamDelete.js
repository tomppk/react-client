import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchStream, deleteStream } from "../../actions";
import Modal from "../Modal";
import history from "../../history";

class StreamDelete extends React.Component {
  componentDidMount() {
    // match.params.id comes from App.js Route component
    // path URL /delete/:id. Name of props is id because
    // of :id wildcard variable in path.
    this.props.fetchStream(this.props.match.params.id);
  }

  // React.Fragment does not render HTML onto screen. It is
  // invisible element to wrap other elements in instead
  // of a <div> that might throw off the layout or styling
  // Can shorten <React.Fragment> to be just empty tags <>
  // button onClick passing a reference to a function that
  // is executed when clicked. This function then calls
  // deleteStream().
  renderActions() {
    const { id } = this.props.match.params;

    return (
      <React.Fragment>
        <button
          onClick={() => this.props.deleteStream(id)}
          className="ui button negative">
          Delete
        </button>
        <Link to="/" className="ui button">
          Cancel
        </Link>
      </React.Fragment>
    );
  }

  // Runs if we do not yet have stream data loaded
  renderContent() {
    if (!this.props.stream) {
      return "Are you sure you want to delete this stream?";
    }

    return `Are you sure you want to delete the stream with title: ${this.props.stream.title} ?`;
  }

  // When clicking outside of modal box send user
  // back to root screen and dismissing modal window
  render() {
    return (
      <Modal
        title="Delete Stream"
        content={this.renderContent()}
        actions={this.renderActions()}
        onDismiss={() => history.push("/")}
      />
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return { stream: state.streams[ownProps.match.params.id] };
};

export default connect(mapStateToProps, { fetchStream, deleteStream })(
  StreamDelete
);
