import React from 'react';
import FlatButton from 'material-ui/FlatButton';
import TextInput from '../forms/TextInput.jsx';
import signinStyles from '../layouts/materialStyle';

const SigninForm = ({ onSigninSubmit, handleSigninChange, signinDetails }) =>
    <form onSubmit={onSigninSubmit} id="signin-form">
      <div>
        <TextInput
          name="username"
          type="text"
          errorText=""
          floatText="Username"
          floatingLabelFixed={true}
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
          errorText=""
          floatText="Password"
          floatingLabelFixed={true}
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
    </form>;

export default SigninForm;
