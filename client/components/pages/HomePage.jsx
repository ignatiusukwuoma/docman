import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import Divider from 'material-ui/Divider';
import Nav from '../layouts/Nav.jsx';
import Sidebar from '../layouts/Sidebar.jsx';
import Searchbar from '../forms/Searchbar.jsx';
import Pagination from '../elements/Pagination.jsx';
import * as userActions from '../../actions/userActions';
import * as searchActions from '../../actions/searchActions';
import * as documentActions from '../../actions/documentActions';

class HomePage extends React.Component {
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

  componentWillMount() {
    this.props.actions.getDocuments();
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.pageData !== nextProps.pageData) {
      this.setState({
        documents: [...nextProps.documents],
        pageData: Object.assign({}, nextProps.pageData),
        documentsLoaded: true
      });
    }
  }

  nextPage() {
    if (this.state.documents.length < 9) {
      return;
    }
    if (this.state.pageData.query) {
      return this.props.actions.searchDocuments(this.state.pageData.query,
        this.state.pageData.offset + 9);
    }
    return this.props.actions.getDocuments(this.state.pageData.offset + 9);
  }

  prevPage() {
    if (this.state.pageData.offset < 1) {
      return;
    }
    if (this.state.pageData.query) {
      return this.props.actions.searchDocuments(this.state.pageData.query,
        this.state.pageData.offset - 9);
    }
    return this.props.actions.getDocuments(this.state.pageData.offset - 9);
  }

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
            {{ __html: document.content.substr(0, 220) }}>
          </p>
        </div>
        <div className="card-action">
          <Link to={`/document/${document.id}`}>READ</Link>
          <a href="#!">{document.access}</a>
        </div>
      </div>
    </div>;

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
                <h3> All Documents </h3>
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

HomePage.propTypes = {
  actions: PropTypes.object.isRequired,
  documents: PropTypes.array.isRequired,
  pageData: PropTypes.object.isRequired,
  access: PropTypes.object.isRequired
};

function mapStateToProps(state, ownProps) {
  return {
    documents: state.documents,
    pageData: state.pageData,
    access: state.userAccess
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(
      Object.assign(documentActions, userActions, searchActions),
      dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
