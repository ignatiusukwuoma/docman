import React from 'react';
import { Link } from 'react-router';

function Sidebar() {
  const homePage = location.pathname === '/home' ? ' active' : '';
  const newDocumentPage = location.pathname === '/document/new'
    ? ' active' : '';
  return (
    <div className="col s12 m4 l3">
      <div className="collection sidebar">
        <Link to="/document/new"
          className={`collection-item${newDocumentPage}`}>
          New Document
          <i className="material-icons document-icons">mail_outline</i>
        </Link>
        <Link to="/document/new" className="collection-item">
          My Documents
          <i className="material-icons document-icons">person_pin</i>
        </Link>
        <Link to="/home" className={`collection-item${homePage}`}>
          All Documents
          <i className="material-icons document-icons">public</i>
        </Link>
        <Link to="/document/new" className="collection-item">
          Private Documents
          <i className="material-icons document-icons">lock</i>
        </Link>
      </div>
    </div>
  );
}
export default Sidebar;
