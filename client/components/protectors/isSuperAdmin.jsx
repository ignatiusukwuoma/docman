import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

/**
 * Parent component to confirm that user is superadmin
 * @class isSuperAdmin
 * @extends {React.Component}
 */
class isSuperAdmin extends React.Component {

  /**
   * Confirms that user is logged in and is superadmin
   * @returns {function} push pathname to router
   * @memberOf isSuperAdmin
   */
  componentWillMount() {
    if (!this.props.access.loggedIn) {
      return this.context.router.push('/');
    }
    if (this.props.access.user.roleId > 1) {
      return this.context.router.push('/home');
    }
  }

  /**
   * Renders the children components if user is superadmin
   * @returns {object} children components
   * @memberOf isSuperAdmin
   */
  render() {
    if (this.props.access.user.roleId === 1) {
      return this.props.children;
    }
    return null;
  }
}

isSuperAdmin.propTypes = {
  access: PropTypes.object.isRequired,
  children: PropTypes.object.isRequired
};

isSuperAdmin.contextTypes = {
  router: PropTypes.object.isRequired
};

export default connect(state =>
({ access: state.userAccess }))(isSuperAdmin);
