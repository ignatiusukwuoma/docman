import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import toastr from 'toastr';
import AdminSidebar from './AdminSidebar.jsx';
import ProfileSidebar from './ProfileSidebar.jsx';
import DocumentSidebar from './DocumentSidebar.jsx';
import handleError from '../../utils/errorHandler';
import { deleteUser, logout } from '../../actions/userActions';

/**
 * The entire sidebar
 * @class Sidebar
 * @extends {React.Component}
 */
export class Sidebar extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      access: props.access,
      user: {}
    };
    this.deleteUser = this.deleteUser.bind(this);
  }

  /**
   * Checks if new user prop have been received and
   * stores it to state
   * @param {object} nextProps
   * @memberOf Sidebar
   */
  componentWillReceiveProps(nextProps) {
    if (this.state.user.id !== nextProps.user.id) {
      this.setState({ user: Object.assign({}, nextProps.user) });
    }
  }

  /**
   * Deletes a user after a confirmation alert
   * @memberOf Sidebar
   */
  deleteUser() {
    // swal({
    //   title: 'Are you sure?',
    //   text: 'This user will be permanently deleted!',
    //   type: 'warning',
    //   showCancelButton: true,
    //   confirmButtonColor: '#DD6B55',
    //   confirmButtonText: 'Yes, delete it!',
    //   cancelButtonText: 'No, cancel this!'
    // })
    // .then((isConfirm) => {
    //   if (isConfirm) {
    this.delete();
    //   }
    // })
    // .catch((err) =>
    //   swal('Cancelled', 'The user is safe :)'));
  }

  delete() {
    this.props.deleteUser(this.state.user.id)
      .then(() => {
        this.props.logout();
        this.context.router.push('/');
        location.reload();
        // this.redirect();
      });
  }

  /**
   * Delete confirmation and redirect after delete is completed
   * @memberOf Sidebar
   */
  redirect = () => {
    // swal('Deleted!', 'Your Account has been deleted.', 'success');
  }

  /**
   * Renders the sidebar, controls which other sidebars are visible
   * @returns {object} jsx
   * @memberOf Sidebar
   */
  render() {
    return (
      <div className="card sidebar">
        {this.state.user
        && location.pathname === `/user/${this.state.user.id}`
        && <ProfileSidebar {...this.state} deleteUser={this.deleteUser} />}
        <DocumentSidebar {...this.state} />
        {this.state.access.user.roleId <= 2
        && <AdminSidebar access={this.state.access} />}
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
