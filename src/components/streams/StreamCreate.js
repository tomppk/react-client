import React from "react";
// Different capitalization indicates that
// Field is a component, reduxForm is a function.
import { Field, reduxForm } from "redux-form";

// Field must have name that describes its function.
// Field does not render anything by itself, assign
// component={} to render actual input element.
// component={this.renderInput} passes set of
// readymade form properties object to renderInput function
// We just use these properties and functions to hook up
// redux-form to our input DOM element.
// onChange call redux-form's formProps object's
// input.onChange function. Set input value as object's
// property input.value.
// We use {...} spread syntax. Takes formProps input
// property and adds all those key:value pairs and adds
// them as properties to input element.
class StreamCreate extends React.Component {
  // Destructure error and touched properties from meta
  // object
  renderError({ error, touched }) {
    if (touched && error) {
      return (
        <div className="ui error message">
          <div className="header">{error}</div>
        </div>
      );
    }
  }

  // Destructuring {input} from (formProps.input)
  // Destructure our own property label from formProps
  // object that is not a default property for this object.
  // Destructure meta property in meta.error we will
  // have error messages for our Field components.
  // For Field name='title' we will have meta.error:
  // 'You must enter a title' as defined in our
  // validate function. This function passes the errors
  // object reduxForm() which passes it to Field components
  // with matching name property.
  // autoComplete='off' disables autocomplete suggestions
  // in browser.
  // meta.touched is true if user has interacted with Field
  // and clicked out of it. Arrow function to bind this
  // to this instance of StreamCreate.
  // className error causes Semantic Ui to show the whole
  // field as red to indicate in which field the error is
  renderInput = ({ input, label, meta }) => {
    const className = `field ${meta.error && meta.touched ? "error" : ""}`;
    return (
      <div className={className}>
        <label>{label}</label>
        <input {...input} autoComplete="off" />
        {this.renderError(meta)}
      </div>
    );
  };

  // onSubmit gets called by our field input values
  // inside formValues object
  onSubmit(formValues) {
    console.log(formValues);
  }

  // Field components from redux-form handle all the logic
  // of updating state in redux store etc. We just need
  // to render input elements and hook up our elements
  // with redux-form's ready made methods and props.
  // When form is submitted we call redux-form's
  // handleSubmit() method that calls our callback method
  // onSubmit().
  // handleSubmit() will call event.preventDefault for us
  // Add className error to our form. By default Semantic
  // UI hides error messages (CSS display: none). If add
  // error class then form will show them.
  render() {
    return (
      <form
        onSubmit={this.props.handleSubmit(this.onSubmit)}
        className="ui form error">
        <Field name="title" component={this.renderInput} label="Enter Title" />
        <Field
          name="description"
          component={this.renderInput}
          label="Enter Description"
        />
        <button className="ui button primary">Submit</button>
      </form>
    );
  }
}

// If return empty object from validate redux-form considers
// form to be valid. If return content inside object then
// there are errors and form is not validated and not
// submitted.
// Redux-Form will look at our Field components name
// property and see if there is key with that name in
// our errors object and display error message.
const validate = (formValues) => {
  const errors = {};

  if (!formValues.title) {
    errors.title = "You must enter a title";
  }

  if (!formValues.description) {
    errors.description = "You must enter a description";
  }

  return errors;
};

// Same syntax as connect() from react-redux. reduxForm()
// will return a function and we will immediately call that
// function with StreamCreate component as parameter.
// reduxForm takes in object where we set form as key and
// descriptive name for form as value.
// Validate key set as our validate function
export default reduxForm({
  form: "streamCreate",
  validate: validate,
})(StreamCreate);
