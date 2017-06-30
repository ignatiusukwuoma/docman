import React from 'react';
import { Link } from 'react-router';
import makeActive from '../../utils/makeActive';

/**
 * Renders the sidebar to manage documents
 * @param {object} access
 * @returns {object} jxs
 */
function DocumentSidebar({ access }) {
  return (
    <div className="collection sidebar">
      <Link to="/document/new"
        className={`collection-item${makeActive('/document/new')}`}>
        New Document
        <i className="material-icons document-icons">mail_outline</i>
      </Link>
      <Link to="/home" className={`collection-item${makeActive('/home')}`}>
        All Documents
        <i className="material-icons document-icons">public</i>
      </Link>
      <Link to={`/user/${access.user.id}/documents`}
        className={
          `collection-item${makeActive(`/user/${access.user.id}/documents`)}`
        }>My Documents
        <i className="material-icons document-icons">person_pin</i>
      </Link>
      <Link to={`/user/${access.user.id}`}
        className={
          `collection-item${makeActive(`/user/${access.user.id}`)}`
        }>My Profile
        <i className="material-icons document-icons">account_box</i>
      </Link>
    </div>
  );
}
export default DocumentSidebar;
