import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import toastr from 'toastr';
import { logout } from '../../actions/userActions';
import handleError from '../../utils/errorHandler';

class Nav extends React.Component {
  constructor(props) {
    super(props);
    this.logout = this.logout.bind(this);
  }

  checkUser() {
    if (this.props.access.loggedIn) {
      return (
        <div id="nav-mobile" className="right hide-on-med-and-down">
          <Link to="" onClick={this.logout}> Logout </Link>
        </div>
      );
    }
  }

  logout() {
    this.props.logout();
  }

  render() {
    return (
      <nav className="navbar-main">
        <div className="nav-wrapper">
          <Link to="/home" className="brand-logo">Docman Pro</Link>
          {this.checkUser()}
        </div>
      </nav>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    access: state.userAccess
  };
}

export default connect(mapStateToProps, { logout })(Nav);
