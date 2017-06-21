import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

class UserIsSuperAdmin extends React.Component {

  componentWillMount() {
    if (!this.props.access.loggedIn) {
      return this.context.router.push('/');
    }
    if (this.props.access.user.roleId > 1) {
      return this.context.router.push('/home');
    }
  }

  render() {
    if (this.props.access.user.roleId === 1) {
      return this.props.children;
    }
    return null;
  }
}

UserIsSuperAdmin.propTypes = {
  access: PropTypes.object.isRequired,
  children: PropTypes.object.isRequired
};

UserIsSuperAdmin.contextTypes = {
  router: PropTypes.object.isRequired
};

export default connect(state =>
({ access: state.userAccess }))(UserIsSuperAdmin);
