import React, {PropTypes} from 'react';
import { connect } from 'react-redux';
import toastr from 'toastr';
import DocumentSidebar from './DocumentSidebar.jsx';
import ProfileSidebar from './ProfileSidebar.jsx';
import AdminSidebar from './AdminSidebar.jsx';
import { deleteUser, logout } from '../../actions/userActions';
import handleError from '../../utils/errorHandler';

class Sidebar extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      access: props.access,
      user: props.user
    };
    this.deleteUser = this.deleteUser.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.user.id !== nextProps.user) {
      this.setState({ user: nextProps.user });
    }
  }

  deleteUser() {
    this.props.deleteUser(this.state.user.id)
      .then(() => this.redirect())
      .catch(error => handleError(error));
  }

  redirect() {
    if (this.state.access.user.roleId === 1) {
      toastr.warning('Account has been deleted');
      this.context.router.push('/home');
    } else {
      this.props.logout();
      toastr.warning('Your Account has been deleted');
    }
  }

  render() {
    const regExp = new RegExp(`/users/${this.state.user.id}`);
    return (
      <div className="sidebar profile">
        {this.state.user &&
        location.pathname.match(regExp) &&
        <ProfileSidebar {...this.state} deleteUser={this.deleteUser}/>}
        <DocumentSidebar {...this.state} />
        {this.state.access.user.roleId <= 2 && <AdminSidebar />}
      </div>
    );
  }
}
Sidebar.propTypes = {
  access: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  deleteUser: PropTypes.func.isRequired
};

Sidebar.contextTypes = {
  router: PropTypes.object.isRequired
};

export default connect(state => ({ access: state.userAccess,
  user: state.user }), { deleteUser, logout })(Sidebar);
