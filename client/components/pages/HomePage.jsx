import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Nav from '../layouts/Nav.jsx';
import Sidebar from '../layouts/Sidebar.jsx';
import Document from '../elements/Document.jsx';
import Searchbar from '../forms/Searchbar.jsx';
import Pagination from '../elements/Pagination.jsx';
import * as userActions from '../../actions/userActions';
import * as searchActions from '../../actions/searchActions';
import * as documentActions from '../../actions/documentActions';

/**
 * The Home Page
 * @class HomePage
 * @extends {React.Component}
 */
export class HomePage extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      documents: [...props.documents],
      pageData: Object.assign({}, props.pageData),
      documentsLoaded: false
    };
    this.nextPage = this.nextPage.bind(this);
    this.prevPage = this.prevPage.bind(this);
  }

  /**
   * Calls function before component mounts
   * @memberOf HomePage
   */
  componentWillMount() {
    this.props.actions.getDocuments();
  }

  /**
   * Updates the state with relevant props
   * @param {any} nextProps
   * @memberOf HomePage
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
   * Next page function for pagination component
   * @returns {function} call to load next set of documents
   * @memberOf HomePage
   */
  nextPage() {
    if (this.state.documents.length < 9) {
      return;
    }
    if (this.state.pageData.query) {
      return this.props.actions.searchDocuments(
        this.state.pageData.query,
        this.state.pageData.offset + 9
      );
    }
    return this.props.actions.getDocuments(this.state.pageData.offset + 9);
  }

  /**
   * Previous page function for pagination component
   * @returns {function} call to load previous documents
   * @memberOf HomePage
   */
  prevPage() {
    if (this.state.pageData.offset < 1) {
      return;
    }
    if (this.state.pageData.query) {
      return this.props.actions.searchDocuments(
        this.state.pageData.query,
        this.state.pageData.offset - 9
      );
    }
    return this.props.actions.getDocuments(this.state.pageData.offset - 9);
  }

  /**
   * Renders the home page
   * @returns {object} jsx
   * @memberOf HomePage
   */
  render() {
    const { documents, documentsLoaded, pageData } = this.state;
    return (
      <div className="home-page">
        <div className="row">
          <div className="col s12 m4 l3">
            <Sidebar />
          </div>
          <div className="col s12 m8 l9">
            <div className="row">
              <div className="headers">
                <h3>All Documents</h3>
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
              nextPage={this.nextPage}
              prevPage={this.prevPage}
              pageData={pageData} />}
          </div>
        </div>
      </div>
    );
  }
}

HomePage.propTypes = {
  pathname: PropTypes.string.isRequired,
  actions: PropTypes.object.isRequired,
  documents: PropTypes.array.isRequired,
  pageData: PropTypes.object.isRequired,
  access: PropTypes.object.isRequired
};

/**
 * Makes state available as props
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

/**
 * Makes action creators available as props
 * @param {function} dispatch
 * @returns {function} actioncreators
 */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(
      Object.assign(documentActions, userActions, searchActions),
      dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
