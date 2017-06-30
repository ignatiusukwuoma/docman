import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

/**
 * Parent component to confirm that user is logged in
 * @class isLoggedIn
 * @extends {React.Component}
 */
class isLoggedIn extends React.Component {

  /**
   * Checks if user is logged in
   * @returns {function} push pathname to router
   * @memberOf isLoggedIn
   */
  componentWillMount() {
    if (!this.props.access.loggedIn) {
      return this.context.router.push('/');
    }
  }

  /**
   * Renders the children components
   * @returns {object} children components
   * @memberOf isLoggedIn
   */
  render() {
    if (this.props.access.loggedIn) {
      return this.props.children;
    }
    return null;
  }
}

isLoggedIn.propTypes = {
  access: PropTypes.object.isRequired,
  children: PropTypes.object.isRequired
};

isLoggedIn.contextTypes = {
  router: PropTypes.object.isRequired
};

export default connect(state => ({ access: state.userAccess }))(isLoggedIn);
