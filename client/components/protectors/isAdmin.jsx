import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

/**
 * Parent component to confirm that user is admin
 * @class isAdmin
 * @extends {React.Component}
 */
class isAdmin extends React.Component {

  /**
   * Checks if user is logged in and roleId is 1 or 2
   * @returns {function} push pathnameto router
   * @memberOf isAdmin
   */
  componentWillMount() {
    if (!this.props.access.loggedIn) {
      return this.context.router.push('/');
    }
    if (this.props.access.user.roleId > 2) {
      return this.context.router.push('/home');
    }
  }

  /**
   * Renders the main component if user is admin
   * @returns {object} children components
   * @memberOf isAdmin
   */
  render() {
    if (this.props.access.user.roleId <= 2) {
      return this.props.children;
    }
    return null;
  }
}

isAdmin.propTypes = {
  access: PropTypes.object.isRequired,
  children: PropTypes.object.isRequired
};

isAdmin.contextTypes = {
  router: PropTypes.object.isRequired
};

export default connect(state => ({ access: state.userAccess }))(isAdmin);
