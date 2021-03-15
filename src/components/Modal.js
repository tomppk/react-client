import React from "react";
import ReactDOM from "react-dom";

// Portals let us render elements as children of body
// HTML element so that they can be shown on top of other
// elements.
// createPortal takes in two arguments. First JSX to render
// Second reference to element we want to place our portal
// inside of. We create new <div id="modal"> inside body.
// Portal cannot be directly attached to body element.
const Modal = (props) => {
  return ReactDOM.createPortal(
    <div onClick={props.onDismiss} className="ui dimmer modals visible active">
      {/* When clicking inside modal box prevent click event object from propagating to div above and activating onClick to send user back to root */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="ui standard modal visible active">
        <div className="header">{props.title}</div>
        <div className="content">{props.content}</div>
        <div className="actions">{props.actions}</div>
      </div>
    </div>,
    document.querySelector("#modal")
  );
};

export default Modal;
