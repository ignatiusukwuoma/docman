import React from 'react';
import TextField from 'material-ui/TextField';

const TextInput = ({
name, type, hint, errorText, floatText, fullWidth,
value, handleChange, floatingLabelFixed, floatingLabelStyle }) => (
  <TextField
    name={name}
    type={type}
    value={value}
    hintText={hint}
    fullWidth={fullWidth}
    errorText={errorText}
    onChange={handleChange}
    floatingLabelText={floatText}
    floatingLabelFixed={floatingLabelFixed}
    floatingLabelStyle={floatingLabelStyle}
  />
);

export default TextInput;
