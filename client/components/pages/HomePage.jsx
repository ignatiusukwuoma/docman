import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Nav from '../layouts/Nav';
import Sidebar from '../layouts/Sidebar';
import Document from '../elements/Document';
import Searchbar from '../forms/Searchbar';
import Pagination from '../elements/Pagination';
import * as userActions from '../../actions/userActions';
import { nextPage, prevPage } from '../../utils/paginate';
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
  }

  /**
   * Calls function after component mounts
   * @memberOf HomePage
   */
  componentDidMount() {
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
              nextPage={() => nextPage(
                documents,
                this.props.actions.getDocuments,
                0,
                pageData.offset,
                pageData.query,
                this.props.actions.searchDocuments
              )}
              prevPage={() => prevPage(
                this.props.actions.getDocuments,
                0,
                pageData.offset,
                pageData.query,
                this.props.actions.searchDocuments
              )}
              pageData={pageData} />}
          </div>
        </div>
      </div>
    );
  }
}

HomePage.propTypes = {
  pathname: PropTypes.string,
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
