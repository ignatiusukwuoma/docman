import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router';
import { CSSTransitionGroup } from 'react-transition-group';
import Divider from 'material-ui/Divider';
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
            <span className="card-title flow-text">
              {document.title.length > 30 ?
              `${document.title.substr(0, 30)}...` : document.title}
            </span>
            <Divider />
            <p dangerouslySetInnerHTML=
              {{ __html: document.content.substr(0, 220) }}>
            </p>
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
              <CSSTransitionGroup
                transitionName="swim"
                transitionEnterTimeout={500}
                transitionLeaveTimeout={300}>
                  {this.state.documents &&
                  this.state.documents.map(this.placeDocuments)}
              </CSSTransitionGroup>
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
