import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

class UserIsLoggedIn extends React.Component {

  componentWillMount() {
    if (!this.props.access.loggedIn) {
      return this.context.router.push('/');
    }
  }

  render() {
    if (this.props.access.loggedIn) {
      return this.props.children;
    }
    return null;
  }
}

UserIsLoggedIn.propTypes = {
  access: PropTypes.object.isRequired,
  children: PropTypes.object.isRequired
};

UserIsLoggedIn.contextTypes = {
  router: PropTypes.object.isRequired
};

export default connect(state => ({ access: state.userAccess }))(UserIsLoggedIn);
