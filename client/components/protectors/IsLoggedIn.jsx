import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

/**
 * Parent component to confirm that user is logged in
 * @class IsLoggedIn
 * @extends {React.Component}
 */
export class IsLoggedIn extends React.Component {

  /**
   * Checks if user is logged in
   * @returns {function} push pathname to router
   * @memberOf IsLoggedIn
   */
  componentWillMount() {
    if (!this.props.access.loggedIn) {
      return this.context.router.push('/');
    }
  }

  /**
   * Renders the children components
   * @returns {object} children components
   * @memberOf IsLoggedIn
   */
  render() {
    if (this.props.access.loggedIn) {
      return this.props.children;
    }
    return null;
  }
}

IsLoggedIn.propTypes = {
  access: PropTypes.object.isRequired,
  children: PropTypes.object.isRequired
};

IsLoggedIn.contextTypes = {
  router: PropTypes.object.isRequired
};

export default connect(state => ({ access: state.userAccess }))(IsLoggedIn);
