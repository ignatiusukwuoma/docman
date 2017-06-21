import React from 'react';
import { Link } from 'react-router';

function DocumentSidebar({ access }) {
  const homePage = location.pathname === '/home' ? ' active' : '';
  const newDocumentPage = location.pathname === '/document/new'
    ? ' active' : '';
  const myDocumentRegExp = new RegExp(`^/user/${access.user.id}/documents`);
  const myDocumentPage = location.pathname.match(myDocumentRegExp)
  ? ' active' : '';
  const myProfilePage = location.pathname === `/user/${access.user.id}`
  ? ' active' : '';

  return (
    <div className="collection sidebar">
      <Link to="/document/new"
        className={`collection-item${newDocumentPage}`}>
        New Document
        <i className="material-icons document-icons">mail_outline</i>
      </Link>
      <Link to="/home" className={`collection-item${homePage}`}>
        All Documents
        <i className="material-icons document-icons">public</i>
      </Link>
      <Link to={`/user/${access.user.id}/documents`}
        className={`collection-item${myDocumentPage}`}>
        My Documents
        <i className="material-icons document-icons">person_pin</i>
      </Link>
      <Link to={`/user/${access.user.id}`}
        className={`collection-item${myProfilePage}`}>My Profile
        <i className="material-icons document-icons">account_box</i>
      </Link>
    </div>
  );
}
export default DocumentSidebar;
