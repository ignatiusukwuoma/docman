import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Nav from '../layouts/Nav';
import Sidebar from '../layouts/Sidebar';
import Searchbar from '../forms/Searchbar';
import Document from '../elements/Document';
import Pagination from '../elements/Pagination';
import * as userActions from '../../actions/userActions';
import { nextPage, prevPage } from '../../utils/paginate';
import * as documentActions from '../../actions/documentActions';


/**
 * The Profile page for each user
 * @class ProfilePage
 * @extends {React.Component}
 */
export class ProfilePage extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      user: Object.assign({}, props.user),
      access: props.access,
      documents: [...props.documents],
      pageData: Object.assign({}, props.pageData),
      documentsLoaded: false
    };
  }

  /**
   * Calls actions to get user information and documents
   * @memberOf ProfilePage
   */
  componentDidMount() {
    this.props.actions.getUser(this.props.params.id);
    this.props.actions.getUserDocuments(this.props.params.id);
  }

  /**
   * Updates the state with props
   * @param {any} nextProps
   * @memberOf ProfilePage
   */
  componentWillReceiveProps(nextProps) {
    if (this.state.pageData !== nextProps.pageData) {
      this.setState({
        user: Object.assign({}, nextProps.user),
        documents: [...nextProps.documents],
        pageData: Object.assign({}, nextProps.pageData),
        documentsLoaded: true
      });
    }
  }

  /**
   * Renders the profile page
   * @returns {object} jsx
   * @memberOf ProfilePage
   */
  render() {
    const { documents, documentsLoaded, user, pageData } = this.state;
    return (
      <div className="home-page">
        <div className="row">
          <div className="col s12 m4 l3">
            <Sidebar />
          </div>
          <div className="col s12 m8 l9">
            <div className="row">
              <div className="headers">
                <h3> Documents </h3>
                <Searchbar />
              </div>
                {documents
                && documents.map(document =>
                  <Document
                    key={document.id}
                    document={document}
                    access={this.props.access}
                    paramsId={this.props.paramsId}
                    pathname={this.props.pathname}
                  />
                )}
            </div>
            {documentsLoaded
            && <Pagination
              documents={documents}
              nextPage={() => nextPage(
                documents,
                this.props.actions.getUserDocuments,
                user.id,
                pageData.offset
              )}
              prevPage={() => prevPage(
                this.props.actions.getUserDocuments,
                user.id,
                pageData.offset
              )}
              pageData={this.state.pageData} />}
          </div>
        </div>
      </div>
    );
  }
}

ProfilePage.propTypes = {
  paramsId: PropTypes.string,
  pathname: PropTypes.string,
  user: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired,
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
  const paramsId = ownProps.params.id;
  return {
    pathname,
    paramsId,
    documents: state.documents,
    pageData: state.pageData,
    access: state.userAccess,
    user: state.user
  };
}

/**
 * Make actions available as props
 * @param {function} dispatch
 * @returns {function} actions
 */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(
      Object.assign(documentActions, userActions),
      dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage);
