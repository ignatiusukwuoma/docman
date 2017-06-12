import React from 'react';
import TextField from 'material-ui/TextField';

const TextInput = ({ name, type, hint, errorText, floatText, value, handleChange }) =>
  <div>
    <TextField
      name={name}
      type={type}
      value={value}
      hintText={hint}
      errorText={errorText}
      onChange={handleChange}
      floatingLabelText={floatText}
    />
  </div>;

export default TextInput;
