import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Divider from 'material-ui/Divider';
import Nav from '../layouts/Nav.jsx';
import Sidebar from '../layouts/Sidebar.jsx';
import Searchbar from '../forms/Searchbar.jsx';
import Pagination from '../elements/Pagination.jsx';
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
    this.nextPage = this.nextPage.bind(this);
    this.prevPage = this.prevPage.bind(this);
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
   * Calls the next set of user's documents
   * @returns {function} action
   * @memberOf UserDocumentsPage
   */
  nextPage() {
    if (this.state.documents.length < 9) {
      return;
    }
    return this.props.getUserDocuments(this.state.access.user.id,
    this.state.pageData.offset + 9);
  }

  /**
   * Calls the previous set of user's documents
   * @returns {function} action
   * @memberOf UserDocumentsPage
   */
  prevPage() {
    if (this.state.pageData.offset < 1) {
      return;
    }
    return this.props.getUserDocuments(this.state.access.user.id,
    this.state.pageData.offset - 9);
  }

  /**
   * Place documents on component
   * @memberOf UserDocumentsPage
   */
  placeDocuments = (document) =>
    <div className="col m6 l4 animated zoomIn" key={document.id}>
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
          <a href="#!">{document.access}</a>
          <Link to={`/document/${document.id}`}>READ</Link>
        </div>
      </div>
    </div>;

  /**
   * Renders the page to display user's documents
   * @returns {object} jsx
   * @memberOf UserDocumentsPage
   */
  render() {
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
                {this.state.documents
                && this.state.documents.map(this.placeDocuments)}
            </div>
            {this.state.documentsLoaded
            && <Pagination
              documents={this.state.documents}
              nextPage={this.nextPage}
              prevPage={this.prevPage}
              pageData={this.state.pageData} />}
          </div>
        </div>
      </div>
    );
  }
}

UserDocumentsPage.propTypes = {
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
  return {
    documents: state.documents,
    pageData: state.pageData,
    access: state.userAccess
  };
}

export default connect(mapStateToProps,
{ getUserDocuments })(UserDocumentsPage);
