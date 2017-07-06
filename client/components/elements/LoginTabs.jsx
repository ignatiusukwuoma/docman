import React, { PropTypes } from 'react';
import SignupForm from '../forms/SignupForm.jsx';
import SigninForm from '../forms/SigninForm.jsx';

function LoginTabs({ onSigninSubmit, signinDetails, signinErrors,
  handleSigninChange, pathname, onSubmit, handleChange, signupErrors,
  signupDetails, confirmPassword, handleConfirmPassword }) {
  return (
    <div className="row login-tabs">
      <div className="col s12">
        <ul className="tabs">
          <li className="tab col s6">
            <a className="active" href="#sign-up">Sign Up</a>
          </li>
          <li className="tab col s6"><a href="#sign-in">Sign In</a></li>
        </ul>
      </div>
      <div id="sign-up" className="col s12">
        <h5> Create a new account </h5>
          <SignupForm
            pathname={pathname}
            onSubmit={onSubmit}
            handleChange={handleChange}
            signupErrors={signupErrors}
            signupDetails={signupDetails}
            confirmPassword={confirmPassword}
            handleConfirmPassword={handleConfirmPassword}
          />
      </div>
      <div id="sign-in" className="col s12">
        <h5>Login to your account </h5>
          <SigninForm
            onSigninSubmit={onSigninSubmit}
            signinDetails={signinDetails}
            signinErrors={signinErrors}
            handleSigninChange={handleSigninChange}
          />
      </div>
  </div>
  );
}

LoginTabs.propTypes = {
  onSigninSubmit: PropTypes.func.isRequired,
  handleSigninChange: PropTypes.func.isRequired,
  signinDetails: PropTypes.object.isRequired,
  signinErrors: PropTypes.object.isRequired,
  pathname: PropTypes.string,
  onSubmit: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  signupDetails: PropTypes.object.isRequired,
  signupErrors: PropTypes.object.isRequired,
  handleConfirmPassword: PropTypes.func,
  confirmPassword: PropTypes.string
};

export default LoginTabs;
