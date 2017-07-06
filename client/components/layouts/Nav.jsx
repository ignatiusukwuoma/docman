import React, { PropTypes } from 'react';
import { Link, browserHistory } from 'react-router';
import { connect } from 'react-redux';
import toastr from 'toastr';
import { logout } from '../../actions/userActions';
import handleError from '../../utils/errorHandler';

/**
 * The Navigation component
 * @class Nav
 * @extends {React.Component}
 */
export class Nav extends React.Component {
  constructor(props) {
    super(props);
    this.logout = this.logout.bind(this);
  }

   /**
   * Logs the user out
   * @memberOf Nav
   */
  logout() {
    this.props.logout()
      .then(() => browserHistory.push('/'));
  }

  /**
   * Checks if user is signed in and displays Logout button
   * @returns {object} jsx
   * @memberOf Nav
   */
  checkUser() {
    if (this.props.access.loggedIn) {
      return (
        <div id="nav-mobile" className="right">
          <Link to="" onClick={this.logout}>Logout</Link>
        </div>
      );
    }
  }

  /**
   * Renders the navigation bar
   * @returns {object} jsx
   * @memberOf Nav
   */
  render() {
    return (
      <nav className="navbar-main">
        <div className="nav-wrapper">
          <a href="/home" className="brand-logo">Docman Pro</a>
          {this.checkUser()}
        </div>
      </nav>
    );
  }
}

Nav.propTypes = {
  access: PropTypes.object
};

export default connect(state =>
({ access: state.userAccess }), { logout })(Nav);
