import React, { PropTypes } from 'react';

/**
 * Displays a select input field
 * @param {any} { id, name, value, error, handleChange }
 * @returns {object} jsx select input
 */
function SelectInput({ access, pathname, id, name,
  value, error, handleChange }) {
  if (access && access.user.roleId === 1 && pathname !== '/') {
    return (
      <div>
      <select
        id={id}
        name={name}
        onChange={handleChange}
        value={value}>
        <option value={1}>SuperAdmin</option>
        <option value={2}>Admin</option>
        <option value={3}>Author</option>
      </select>
      {error && <div className="red-text small">{error}</div>}
    </div>
    );
  }
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
  id: PropTypes.string,
  name: PropTypes.string.isRequired,
  value: PropTypes.string,
  handleChange: PropTypes.func.isRequired,
  error: PropTypes.string
};

export default SelectInput;
