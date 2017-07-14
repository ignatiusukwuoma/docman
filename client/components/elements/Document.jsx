import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import Divider from 'material-ui/Divider';

function Document({ document, pathname, access, paramsId }) {
  return (
    <div className="col m6 l4 animated zoomIn">
      <div className="card">
        <div className="card-content enlarge-card">
          <span className="card-title">
            {document.title.length > 30
            ? `${document.title.substr(0, 30)}...` : document.title}
          </span>
          <Divider />
          <p dangerouslySetInnerHTML=
            {{ __html: document.content.substr(0, 120) }}>
          </p>
        </div>
        <div className="card-action">
          <a className="access" href="#!">
            {
              pathname === '/home'
              ? `BY ${document.User.username}`
              : document.access
            }
          </a>
          {
            pathname !== `/user/${Number(paramsId)}`
            && <Link className="read-link" to={`/document/${document.id}`}>
                READ
              </Link>
          }
          {
            pathname === `/user/${Number(paramsId)}`
            && (document.access === 'public' || document.access === 'role'
            || (document.access === 'private'
            && access.user.id === Number(paramsId)))
            && <Link to={`/document/${document.id}`}>READ</Link>
          }
        </div>
      </div>
    </div>
  );
}

Document.propTypes = {
  document: PropTypes.object.isRequired,
  pathname: PropTypes.string.isRequired,
  access: PropTypes.object,
  paramsId: PropTypes.string
};

export default Document;
