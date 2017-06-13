import React from 'react';
import FlatButton from 'material-ui/FlatButton';
import TextInput from '../forms/TextInput.jsx';


const SignupForm = ({ onSubmit, handleChange, signupDetails }) =>
  <form onSubmit={onSubmit}>
    <div>
      <TextInput
        name="name"
        type="text"
        hint="Enter Your Full Name"
        errorText=""
        floatText="Name"
        handleChange={handleChange}
        value={signupDetails.name}
      />
    </div>
    <div>
      <TextInput
        name="email"
        type="email"
        hint="Enter Your Email"
        errorText=""
        floatText="Email"
        handleChange={handleChange}
        value={signupDetails.email}
      />
    </div>
    <div>
      <TextInput
        name="username"
        type="text"
        hint="Choose A Username"
        errorText=""
        floatText="Username"
        handleChange={handleChange}
        value={signupDetails.username}
      />
    </div>
    <div>
      <TextInput
        name="password"
        type="password"
        hint="Choose A Password"
        errorText=""
        floatText="Password"
        handleChange={handleChange}
        value={signupDetails.password}
      />
    </div>
    <FlatButton
      backgroundColor="#a4c639"
      hoverColor="#8AA62F"
      label="Create an Account"
      onClick={onSubmit}
    />
  </form>;

export default SignupForm;
