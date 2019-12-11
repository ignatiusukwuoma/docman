import React, { PropTypes } from 'react';
import FlatButton from 'material-ui/FlatButton';
import TextInput from '../forms/TextInput.jsx';

/**
 * Renders the sign in form
 * @param {any} {
 *   onSigninSubmit, handleSigninChange, signinDetails, signinErrors }
 * @returns {object} jsx to display a form
 */
function SigninForm({
  onSigninSubmit, handleSigninChange, signinDetails, signinErrors }) {
  return (
    <form onSubmit={onSigninSubmit} id="signin-form">
      <div>
        <TextInput
          id="signin-username"
          name="username"
          type="text"
          errorText={signinErrors.username}
          floatText="Username"
          handleChange={handleSigninChange}
          value={signinDetails.username}
        />
      </div>
      <div>
        <TextInput
          id="signin-password"
          name="password"
          type="password"
          errorText={signinErrors.password}
          floatText="Password"
          handleChange={handleSigninChange}
          value={signinDetails.password}
        />
      </div>
      <FlatButton
        backgroundColor="#a4c639"
        hoverColor="#8AA62F"
        label="Log In"
        onClick={onSigninSubmit}
      />
    </form>
  );
}

SigninForm.propTypes = {
  onSigninSubmit: PropTypes.func.isRequired,
  handleSigninChange: PropTypes.func.isRequired,
  signinDetails: PropTypes.object.isRequired,
  signinErrors: PropTypes.object.isRequired
};

export default SigninForm;
