import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router';
import * as userActions from '../../actions/userActions';
import * as documentActions from '../../actions/documentActions';

class HomePage extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      documents: [],
      // documents: [...props.documents],
      // pageData: Object.assign({}, props.pageData)
    };
    this.logout = this.logout.bind(this);
    // this.placeDocs = this.placeDocs.bind(this);
  }

  componentWillMount() {
    this.props.actions.getDocuments();
  }

  componentWillReceiveProps(nextProps) {
    console.log('NexPropss', nextProps);
    this.setState({ documents: nextProps.documents });
  }

  logout() {
    this.props.actions.logout();
  }

  placeDocs(doc) {
    return <div key={doc.id}>{doc.title}</div>;
  }


  render() {
    debugger;
    return (
      <div>
        <h2>Home Page</h2>
        <Link to="" onClick={this.logout}> Logout </Link>
        {this.state.documents && this.state.documents.map(this.placeDocs)}
      </div>
    );
  }
}

HomePage.propTypes = {
  actions: PropTypes.object.isRequired,
};

function mapStateToProps(state, ownProps) {
  debugger;
  return {
    documents: state.documentData.documents,
    pageData: state.documentData.pageData,
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
