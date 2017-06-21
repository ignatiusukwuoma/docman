import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import toastr from 'toastr';
import AdminSidebar from './AdminSidebar.jsx';
import ProfileSidebar from './ProfileSidebar.jsx';
import DocumentSidebar from './DocumentSidebar.jsx';
import handleError from '../../utils/errorHandler';
import { deleteUser, logout } from '../../actions/userActions';

class Sidebar extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      access: props.access,
      user: {}
    };
    this.deleteUser = this.deleteUser.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.user.id !== nextProps.user.id) {
      this.setState({ user: Object.assign({}, nextProps.user) });
    }
  }

  deleteUser() {
    swal({
      title: 'Are you sure?',
      text: 'This user will be permanently deleted!',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#DD6B55',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel this!'
    })
    .then((isConfirm) => {
      if (isConfirm) {
        this.props.deleteUser(this.state.user.id)
        .then(() => this.redirect());
      }
    })
    .catch((er) =>
      swal('Cancelled', 'The user is safe :)', 'error'));
  }

  redirect() {
    if (this.state.access.user.roleId === 1) {
      swal('Deleted!', 'The user has been deleted.', 'success');
      this.context.router.push('/home');
    } else {
      this.props.logout();
      this.context.router.push('/');
      swal('Deleted!', 'Your Account has been deleted.', 'success');
    }
  }

  render() {
    return (
      <div className="card sidebar">
        {this.state.user
        && location.pathname === `/user/${this.state.user.id}`
        && <ProfileSidebar {...this.state} deleteUser={this.deleteUser}/>}
        <DocumentSidebar {...this.state} />
        {this.state.access.user.roleId <= 2
        && <AdminSidebar access={this.state.access}/>}
      </div>
    );
  }
}
Sidebar.propTypes = {
  access: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired
};

Sidebar.contextTypes = {
  router: PropTypes.object.isRequired
};

export default connect(state => ({ access: state.userAccess,
  user: state.user }), { deleteUser, logout })(Sidebar);
