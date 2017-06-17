import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router';
import toastr from 'toastr';
import Divider from 'material-ui/Divider';
import { getDocument, deleteDocument } from '../../actions/documentActions';
import Sidebar from '../layouts/Sidebar.jsx';
import AdminSidebar from '../layouts/AdminSidebar.jsx';


class ViewDocumentPage extends React.Component {
  constructor(props) {
    super(props);
    this.deleteDocument = this.deleteDocument.bind(this);
  }

  componentWillMount() {
    this.props.getDocument(this.props.params.id);
  }

  deleteDocument(documentId) {
    this.props.deleteDocument(this.props.params.id);
    toastr.success('Document deleted successfully');
  }

  render() {
    const { document } = this.props;
    return (
      <div className="viewDocument">
        <div className="row">
          <div className="col s12 m4 l3">
            <Sidebar />
            <AdminSidebar />
          </div>
          <div className="col s12 m8 l9">
            <div className="container center-align">
              <h2>{document.title}</h2>
              <h6>
                Posted on {new Date(document.createdAt).toDateString()},
                by: <span className="blue-text">
                  <strong>
                    {document.User ? document.User.username : ''}
                  </strong>
                </span>
              </h6>
              <Divider />
              <p dangerouslySetInnerHTML={{ __html: document.content }}></p>
              <Link to={`/document/${document.id}/edit`}
                className=
                "btn-floating btn-large waves-effect waves-light green">
                <i className="material-icons">mode_edit</i>
              </Link>
              <Link to="/home" onClick={this.deleteDocument}
                className="btn-floating btn-large waves-effect waves-light red">
                <i className="material-icons">delete_forever</i>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

ViewDocumentPage.propTypes = {
  document: PropTypes.object.isRequired,
  getDocument: PropTypes.func.isRequired
};

ViewDocumentPage.contextTypes = {
  router: PropTypes.object.isRequired,
};

function mapStateToProps(state, ownProps) {
  // const documentId = ownProps.document.id;
  return {
    document: state.document
  };
}

export default connect(mapStateToProps, { getDocument, deleteDocument })(ViewDocumentPage);
