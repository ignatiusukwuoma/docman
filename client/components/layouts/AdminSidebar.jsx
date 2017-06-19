import React from 'react';
import { Link } from 'react-router';

function AdminSidebar() {
  const usersPage = location.pathname === '/users/manage' ? ' active' : '';
  const rolesPage = location.pathname === '/roles/manage' ? ' active' : '';
  return (
    <div className="collection sidebar">
      <Link to="/users/manage"
        className={`collection-item${usersPage}`}>
        Manage Users
        <i className="material-icons document-icons">people</i>
      </Link>
      <Link to="/roles/manage"
        className={`collection-item${rolesPage}`}>
        Manage Roles
        <i className="material-icons document-icons">supervisor_account</i>
      </Link>
    </div>
  );
}
export default AdminSidebar;
