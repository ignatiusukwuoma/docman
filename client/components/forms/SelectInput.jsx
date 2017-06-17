import React from 'react';

function SelectInput({ id, name, value, error, handleChange }) {
  return (
    <div>
      <select
        id={id}
        name={name}
        onChange={handleChange}
        value={value}>
        <option value="null">Select Access</option>
        <option value="public">Public</option>
        <option value="private">Private</option>
        <option value="role">Role</option>
      </select>
      {error && <div className="red-text">{error}</div>}
    </div>
  );
}

export default SelectInput;
