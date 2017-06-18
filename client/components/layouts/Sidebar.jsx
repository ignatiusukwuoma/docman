import React, {PropTypes} from 'react';
import { connect } from 'react-redux';
import DocumentSidebar from './DocumentSidebar.jsx';
import ProfileSidebar from './ProfileSidebar.jsx';
import AdminSidebar from './AdminSidebar.jsx';

class Sidebar extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      access: props.access,
      user: props.user
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.user.id !== nextProps.user) {
      this.setState({ user: nextProps.user });
    }
  }

  render() {
    const regExp = new RegExp(`/users/${this.state.user.id}`);
    return (
      <div className="sidebar profile">
        {this.state.user &&
        location.pathname.match(regExp) &&
        <ProfileSidebar {...this.state} />}
        <DocumentSidebar {...this.state} />
        {this.state.access.user.roleId <= 2 && <AdminSidebar />}
      </div>
    );
  }
}


export default connect(state => ({ access: state.userAccess, user: state.user }))(Sidebar);
