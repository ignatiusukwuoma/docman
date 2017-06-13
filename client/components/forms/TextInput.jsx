import React from 'react';
import TextField from 'material-ui/TextField';

const TextInput = ({
name, type, hint, errorText, floatText,
value, handleChange, floatingLabelFixed, floatingLabelStyle }) =>
  <TextField
    name={name}
    type={type}
    value={value}
    hintText={hint}
    errorText={errorText}
    onChange={handleChange}
    floatingLabelText={floatText}
    floatingLabelFixed={floatingLabelFixed}
    floatingLabelStyle={floatingLabelStyle}
  />;

export default TextInput;
