import React from 'react';

function SelectInput({ id, name, value, handleChange }) {
  return <select
    id={id}
    name={name}
    onChange={handleChange}
    value={value}>
    <option value="public">Public</option>
    <option value="private">Private</option>
    <option value="role">Role</option>
  </select>;
}

export default SelectInput;
