import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router';
import Nav from '../layouts/Nav.jsx';
import Sidebar from '../layouts/Sidebar.jsx';
import * as userActions from '../../actions/userActions';
import * as documentActions from '../../actions/documentActions';

class HomePage extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      documents: [],
      pageData: {}
    };
  }

  componentWillMount() {
    this.props.actions.getDocuments();
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      documents: nextProps.documents,
      pageData: nextProps.pageData
    });
  }

  placeDocuments(document) {
    return (
      <div className="col m6 l4" key={document.id}>
        <div className="card">
          <div className="card-content white-text enlarge-card">
            <span className="card-title flow-text">{document.title}</span>
            <p dangerouslySetInnerHTML={{ __html: document.content }}></p>
          </div>
          <div className="card-action">
            <Link to={`/document/${document.id}`}>VIEW</Link>
            <Link to={`/document/${document.id}`}>{document.access}</Link>
          </div>
        </div>
      </div>
    );
  }

  render() {
    return (
      <div className="home-page">
        <div className="row">
          <Sidebar />
          <div className="col s12 m8 l9">
            <div className="row">
              {this.state.documents &&
              this.state.documents.map(this.placeDocuments)}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

HomePage.propTypes = {
  actions: PropTypes.object.isRequired,
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
      Object.assign(documentActions, userActions),
      dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
