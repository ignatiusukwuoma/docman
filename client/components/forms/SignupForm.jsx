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
function SignupForm({ access, pathname, onSubmit, handleChange, disabled,
  signupDetails, handleConfirmPassword, confirmPassword, signupErrors }) {
  return (
    <form onSubmit={onSubmit} id="signup-form">
      <div>
        <TextInput
          id="signup-name"
          name="name"
          type="text"
          disabled={disabled}
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
          disabled={disabled}
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
          disabled={disabled}
          errorText={signupErrors.username}
          floatText="Username"
          handleChange={handleChange}
          value={signupDetails.username}
        />
      </div>
      { pathname === '/'
      && <div>
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
      </div>}
      { access && pathname !== '/' && access.user.roleId === 1
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
  disabled: PropTypes.bool,
  pathname: PropTypes.string,
  onSubmit: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  signupDetails: PropTypes.object.isRequired,
  signupErrors: PropTypes.object.isRequired,
  handleConfirmPassword: PropTypes.func,
  confirmPassword: PropTypes.string
};

export default SignupForm;
