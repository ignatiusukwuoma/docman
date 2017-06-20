import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

class UserIsAdmin extends React.Component {

  componentWillMount() {
    if (this.props.access.user.roleId > 2) {
      return this.context.router.push('/');
    }
  }

  render() {
    if (this.props.access.user.roleId <= 2) {
      return this.props.children;
    }
    return null;
  }
}

UserIsAdmin.propTypes = {
  access: PropTypes.object.isRequired,
  children: PropTypes.object.isRequired
};

UserIsAdmin.contextTypes = {
  router: PropTypes.object.isRequired
};

export default connect(state => ({ access: state.userAccess }))(UserIsAdmin);
