import React from 'react';

function TextInput({ name, type, errorText, floatText, value, handleChange }) {
  return (
    <div className="input-field">
      <label htmlFor={name}>{floatText}</label>
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={handleChange}
      />
      {errorText && <div className="red-text small">{errorText}</div>}
    </div>
  );
}
export default TextInput;
