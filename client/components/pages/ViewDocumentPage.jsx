import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import toastr from 'toastr';
import Divider from 'material-ui/Divider';
import handleError from '../../utils/errorHandler';
import Sidebar from '../layouts/Sidebar.jsx';
import { getDocument, deleteDocument } from '../../actions/documentActions';

/**
 * Page for an individual document
 * @class ViewDocumentPage
 * @extends {React.Component}
 */
export class ViewDocumentPage extends React.Component {
  constructor(props) {
    super(props);
    this.deleteDocument = this.deleteDocument.bind(this);
  }

  /**
   * Calls actions to get the document by id
   * @memberOf ViewDocumentPage
   */
  componentWillMount() {
    this.props.getDocument(this.props.params.id);
  }

  /**
   * Calls the deleteDocument after a sweetalert confirmation
   * @memberOf ViewDocumentPage
   */
  deleteDocument = () => {
    swal({
      title: 'Are you sure?',
      text: 'You will not be able to recover this document!',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#DD6B55',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel this!'
    })
    .then((isConfirm) => {
      if (isConfirm) {
        this.delete();
      }
    })
    .catch((er) =>
      swal('Cancelled', 'The document is safe :)', 'error'));
  }

  /**
   * Deletes the document
   * @memberOf ViewDocumentPage
   */
  delete() {
    this.props.deleteDocument(this.props.params.id)
    .then(() => this.redirect());
  }

  /**
   * Displays a sweetalert success message
   * @memberOf ViewDocumentPage
   */
  redirect() {
    swal('Deleted!', 'This document has been deleted.', 'success');
    this.context.router.push('/home');
  }

  /**
   * Renders the page to display the entire content of a document
   * @returns {object} jsx
   * @memberOf ViewDocumentPage
   */
  render() {
    const { document, access } = this.props;
    return (
      <div className="view-document">
        <div className="row">
          <div className="col s12 m4 l3">
            <Sidebar />
          </div>
          <div className="col s12 m8 l9">
            <div className="container">
              <div>
              <h4>{document.title}</h4>
              {(access.user.id === document.userId)
            && <div className="document-actions">
              <Link to={`/document/${document.id}/edit`}
                className="btn-floating waves-effect waves-light green"
                title="Edit document"
              >
                <i className="material-icons">mode_edit</i>
              </Link>
              <a href="#!" onClick={this.deleteDocument}
                className="btn-floating waves-effect waves-light red btn-delete"
                title="Delete document"
              >
                <i className="material-icons">delete_forever</i>
              </a>
            </div>}
              <h6>
                <span id="document-rights">
                  {document.access} document by
                  {document.User ? ` ${document.User.username}. ` : ''}
                </span>
                Posted on {new Date(document.createdAt).toDateString()}.
              </h6>
              </div>
              <Divider />
              <p className="document-content"
              dangerouslySetInnerHTML={{ __html: document.content }}></p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

ViewDocumentPage.propTypes = {
  document: PropTypes.object.isRequired,
  getDocument: PropTypes.func.isRequired,
  deleteDocument: PropTypes.func.isRequired,
  access: PropTypes.object.isRequired
};

ViewDocumentPage.contextTypes = {
  router: PropTypes.object.isRequired
};

/**
 * Make state available as props
 * @param {object} state
 * @param {object} ownProps
 * @returns {object} props
 */
function mapStateToProps(state, ownProps) {
  return {
    document: state.document,
    access: state.userAccess
  };
}

export default connect(mapStateToProps,
{ getDocument, deleteDocument })(ViewDocumentPage);
