import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as userActions from '../../actions/userActions';

class HomePage extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {

    };
  }


  render() {
    return (
      <div>
        <h2>Home Page</h2>

      </div>
    );
  }
}

HomePage.propTypes = {
  actions: PropTypes.object.isRequired,
};

function mapStateToProps(state, ownProps) {
  return {
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(userActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
