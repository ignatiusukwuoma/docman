import React from 'react';
import FlatButton from 'material-ui/FlatButton';
import TextInput from '../forms/TextInput.jsx';


const SignupForm = ({ onSubmit, handleChange, signupDetails }) =>
  <form onSubmit={onSubmit}>
    <TextInput
      name="name"
      type="text"
      hint="Enter Your Full Name"
      errorText=""
      floatText="Name"
      handleChange={handleChange}
      value={signupDetails.name}
    />
    <TextInput
      name="email"
      type="email"
      hint="Enter Your Email"
      errorText=""
      floatText="Email"
      handleChange={handleChange}
      value={signupDetails.email}
    />
    <TextInput
      name="username"
      type="text"
      hint="Choose A Username"
      errorText=""
      floatText="Username"
      handleChange={handleChange}
      value={signupDetails.username}
    />
    <TextInput
      name="password"
      type="password"
      hint="Choose A Password"
      errorText=""
      floatText="Password"
      handleChange={handleChange}
      value={signupDetails.password}
    />
    <FlatButton
      backgroundColor="#a4c639"
      hoverColor="#8AA62F"
      label="SUBMIT"
      onClick={onSubmit}
    />
  </form>;

export default SignupForm;
