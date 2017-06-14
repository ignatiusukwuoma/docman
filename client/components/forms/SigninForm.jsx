import React from 'react';
import FlatButton from 'material-ui/FlatButton';
import TextInput from '../forms/TextInput.jsx';
import signinStyles from '../layouts/materialStyle';

function SigninForm({ onSigninSubmit, handleSigninChange, signinDetails, signinErrors }) {
  return (
    <form onSubmit={onSigninSubmit} id="signin-form">
      <div>
        <TextInput
          name="username"
          type="text"
          errorText={signinErrors.username}
          floatText="Username"
          hint="Enter Your Username"
          floatingLabelStyle={signinStyles.signinForm}
          handleChange={handleSigninChange}
          value={signinDetails.username}
        />
      </div>
      <div>
        <TextInput
          id="password"
          name="password"
          type="password"
          errorText={signinErrors.password}
          floatText="Password"
          hint="Enter Your Password"
          floatingLabelStyle={signinStyles.signinForm}
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

export default SigninForm;
