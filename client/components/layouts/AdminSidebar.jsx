import React from 'react';
import { Link } from 'react-router';
import makeActive from '../../utils/makeActive';

/**
 * Renders the sidebar to manage users and roles
 * @param {object} { access }
 * @returns {object} jsx
 */
function AdminSidebar({ access }) {
  return (
    <div className="collection admin-sidebar">
      <Link to="/manageusers"
        className={`collection-item${makeActive('/manageusers')}`}>
        Manage Users
        <i className="material-icons document-icons">people</i>
      </Link>
      {access.user.roleId === 1
      && <Link to="/manageroles"
        className={`collection-item${makeActive('/manageroles')}`}>
        Manage Roles
        <i className="material-icons document-icons">supervisor_account</i>
      </Link>}
    </div>
  );
}
export default AdminSidebar;
