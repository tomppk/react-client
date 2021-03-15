import React from "react";
import { connect } from "react-redux";
import flv from "flv.js";
import { fetchStream } from "../../actions";

class StreamShow extends React.Component {
  constructor(props) {
    super(props);

    this.videoRef = React.createRef();
  }

  // Create video player. Set config object. Instructions
  // from flv.js npm. Type of video we are trying to receive
  // and url to request video from.
  // this.player set as new video player. Attach created
  // player to our HTML <video> element. Load up the player
  // into <video> element.
  // When our component first renders attempt to build player
  componentDidMount() {
    const { id } = this.props.match.params;

    this.props.fetchStream(id);
    this.buildPlayer();
  }

  // When we succesfully fetch stream attempt to build player
  componentDidUpdate() {
    this.buildPlayer();
  }

  // Runs when component is not being rendered on the screen
  // So when we show some other component than StreamShow.
  // player.destroy() will tell the player to stop streaming
  // video and to detach it from html <video> element
  componentWillUnmount() {
    this.player.destroy();
  }

  buildPlayer() {
    if (this.player || !this.props.stream) {
      return;
    }

    // In OBS our stream key is id of stream so eg. 1.
    const { id } = this.props.match.params;
    this.player = flv.createPlayer({
      type: "flv",
      url: `http://localhost:8000/live/${id}.flv`,
    });
    this.player.attachMediaElement(this.videoRef.current);
    this.player.load();
  }

  render() {
    if (!this.props.stream) {
      return <div>Loading...</div>;
    }

    const { title, description } = this.props.stream;

    return (
      <div>
        {/* Get reference to the DOM video element. Set controls true to show video element controls */}
        <video ref={this.videoRef} style={{ width: "100%" }} controls />
        <h1>{title}</h1>
        <h5>{description}</h5>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return { stream: state.streams[ownProps.match.params.id] };
};

export default connect(mapStateToProps, { fetchStream })(StreamShow);
