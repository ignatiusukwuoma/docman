import React, { PropTypes } from 'react';
import { Tabs, Tab } from 'material-ui/Tabs';
import SignupForm from '../forms/SignupForm.jsx';
import SigninForm from '../forms/SigninForm.jsx';

function LoginTabs({ onSigninSubmit, signinDetails, signinErrors,
  handleSigninChange, pathname, onSubmit, handleChange, signupErrors,
  signupDetails, confirmPassword, handleConfirmPassword }) {
  return (
    <Tabs className="login-tabs">
      <Tab label="Sign Up" >
        <div>
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
      </Tab>
      <Tab label="Sign In" >
        <div>
          <h5>Login to your account </h5>
          <SigninForm
            onSigninSubmit={onSigninSubmit}
            signinDetails={signinDetails}
            signinErrors={signinErrors}
            handleSigninChange={handleSigninChange}
          />
        </div>
      </Tab>
    </Tabs>
  );
}

export default LoginTabs;
