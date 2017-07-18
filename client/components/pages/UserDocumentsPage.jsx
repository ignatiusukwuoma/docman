import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Nav from '../layouts/Nav.jsx';
import Sidebar from '../layouts/Sidebar.jsx';
import Searchbar from '../forms/Searchbar.jsx';
import Document from '../elements/Document.jsx';
import Pagination from '../elements/Pagination.jsx';
import { nextPage, prevPage } from '../../utils/paginate';
import { getUserDocuments } from '../../actions/documentActions';

/**
 * The logged in user's documents
 * @class UserDocumentsPage
 * @extends {React.Component}
 */
export class UserDocumentsPage extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      access: props.access,
      documents: [...props.documents],
      pageData: Object.assign({}, props.pageData),
      documentsLoaded: false
    };
  }

  /**
   * Calls actions for the user's documents before component mounts
   * @memberOf UserDocumentsPage
   */
  componentWillMount() {
    this.props.getUserDocuments(this.props.params.id);
  }

  /**
   * Updates this.state with props
   * @param {object} nextProps
   * @memberOf UserDocumentsPage
   */
  componentWillReceiveProps(nextProps) {
    if (this.state.pageData !== nextProps.pageData) {
      this.setState({
        documents: [...nextProps.documents],
        pageData: Object.assign({}, nextProps.pageData),
        documentsLoaded: true
      });
    }
  }

  /**
   * Renders the page to display user's documents
   * @returns {object} jsx
   * @memberOf UserDocumentsPage
   */
  render() {
    const { documents, documentsLoaded, access, pageData } = this.state;
    return (
      <div className="home-page">
        <div className="row">
          <div className="col s12 m4 l3">
            <Sidebar />
          </div>
          <div className="col s12 m8 l9">
            <div className="row">
              <div className="headers">
                <h3> My Documents </h3>
                <Searchbar />
              </div>
                {documents
                && documents.map(document =>
                  <Document
                    key={document.id}
                    document={document}
                    pathname={this.props.pathname}
                  />
                )}
            </div>
            {documentsLoaded
            && <Pagination
              documents={documents}
              nextPage={() => nextPage(
                documents,
                this.props.getUserDocuments,
                access.user.id,
                pageData.offset
              )}
              prevPage={() => prevPage(
                this.props.getUserDocuments,
                access.user.id,
                pageData.offset
              )}
              pageData={this.state.pageData} />}
          </div>
        </div>
      </div>
    );
  }
}

UserDocumentsPage.propTypes = {
  pathname: PropTypes.string,
  getUserDocuments: PropTypes.func.isRequired,
  documents: PropTypes.array.isRequired,
  pageData: PropTypes.object.isRequired,
  access: PropTypes.object.isRequired
};

/**
 * Make state available as props
 * @param {object} state
 * @param {object} ownProps
 * @returns {object} props
 */
function mapStateToProps(state, ownProps) {
  const pathname = ownProps.location.pathname;
  return {
    pathname,
    documents: state.documents,
    pageData: state.pageData,
    access: state.userAccess
  };
}

export default connect(mapStateToProps,
{ getUserDocuments })(UserDocumentsPage);
