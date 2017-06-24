import React, { PropTypes } from 'react';
import FlatButton from 'material-ui/FlatButton';
import TextInput from '../forms/TextInput.jsx';
import SelectInput from '../forms/SelectInput.jsx';

/**
 * Renders the sign up form or edit profile form
 * @param {any} { pathname, onSubmit, handleChange, signupDetails,
 *   handleConfirmPassword, confirmPassword, signupErrors }
 * @returns {object} jsx object to display form
 */
function SignupForm({ access, pathname, onSubmit, handleChange,
  signupDetails, handleConfirmPassword, confirmPassword, signupErrors }) {
  return (
    <form onSubmit={onSubmit} id="signup-form">
      <div>
        <TextInput
          id="signup-name"
          name="name"
          type="text"
          errorText={signupErrors.name}
          floatText="Name"
          handleChange={handleChange}
          value={signupDetails.name}
        />
      </div>
      <div>
        <TextInput
          id="signup-email"
          name="email"
          type="email"
          errorText={signupErrors.email}
          floatText="Email"
          handleChange={handleChange}
          value={signupDetails.email}
        />
      </div>
      <div>
        <TextInput
          id="signup-username"
          name="username"
          type="text"
          errorText={signupErrors.username}
          floatText="Username"
          handleChange={handleChange}
          value={signupDetails.username}
        />
      </div>
      <div>
        <TextInput
          id="signup-password"
          name="password"
          type="password"
          errorText={signupErrors.password}
          floatText="Password"
          handleChange={handleChange}
          value={signupDetails.password}
        />
      </div>
      <div>
        <TextInput
          id="signup-confirm-password"
          name="confirmPassword"
          type="password"
          errorText={signupErrors.confirmPassword}
          floatText="Confirm Password"
          handleChange={handleConfirmPassword}
          value={confirmPassword}
        />
      </div>
      { pathname !== '/' && access.user.roleId === 1
      && <div>
        <SelectInput
          id="select-role"
          name="roleId"
          handleChange={handleChange}
          value={signupDetails.roleId}
          pathname={pathname}
          access={access}
        />
      </div>}
      <FlatButton
        backgroundColor="#a4c639"
        hoverColor="#8AA62F"
        label={pathname === '/'
        ? 'Create an Account' : 'Update Account'}
        onClick={onSubmit}
      />
    </form>
  );
}

SignupForm.propTypes = {
  pathname: PropTypes.string,
  onSubmit: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  signupDetails: PropTypes.object.isRequired,
  handleConfirmPassword: PropTypes.func.isRequired,
  confirmPassword: PropTypes.string.isRequired,
  signupErrors: PropTypes.object.isRequired
};

export default SignupForm;
