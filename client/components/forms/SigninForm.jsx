import React from 'react';
import FlatButton from 'material-ui/FlatButton';
import TextInput from '../forms/TextInput.jsx';


const SigninForm = ({ onSigninSubmit, handleSigninChange, signinDetails }) =>
  <form onSubmit={onSigninSubmit}>
    <TextInput
      name="username"
      type="text"
      hint="Enter Your Username"
      errorText=""
      floatText="Username"
      handleChange={handleSigninChange}
      value={signinDetails.username}
    />
    <TextInput
      name="password"
      type="password"
      hint="Enter Your Password"
      errorText=""
      floatText="Password"
      handleChange={handleSigninChange}
      value={signinDetails.password}
    />
    <FlatButton
      backgroundColor="#a4c639"
      hoverColor="#8AA62F"
      label="SUBMIT"
      onClick={onSigninSubmit}
    />
  </form>;

export default SigninForm;
