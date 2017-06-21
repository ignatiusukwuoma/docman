import React, { PropTypes } from 'react';

function SelectInput({ id, name, value, error, handleChange }) {
  return (
    <div>
      <select
        id={id}
        name={name}
        onChange={handleChange}
        value={value}>
        <option value="select">Who can see this?</option>
        <option value="public">Public</option>
        <option value="private">Private</option>
        <option value="role">Role</option>
      </select>
      {error && <div className="red-text small">{error}</div>}
    </div>
  );
}

SelectInput.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string,
  handleChange: PropTypes.func.isRequired,
  error: PropTypes.string
};

export default SelectInput;
