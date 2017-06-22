import React from 'react';
import { Link } from 'react-router';

function AdminSidebar({ access }) {
  const usersPage = location.pathname === '/manageusers' ? ' active' : '';
  const rolesPage = location.pathname === '/manageroles' ? ' active' : '';
  return (
    <div className="collection sidebar">
      <Link to="/manageusers"
        className={`collection-item${usersPage}`}>
        Manage Users
        <i className="material-icons document-icons">people</i>
      </Link>
      {access.user.roleId === 1
      && <Link to="/manageroles"
        className={`collection-item${rolesPage}`}>
        Manage Roles
        <i className="material-icons document-icons">supervisor_account</i>
      </Link>}
    </div>
  );
}
export default AdminSidebar;
