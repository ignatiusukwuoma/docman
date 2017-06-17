import React, {PropTypes} from 'react';
import { connect } from 'react-redux';
import DocumentSidebar from './DocumentSidebar.jsx';
import AdminSidebar from './AdminSidebar.jsx';

class Sidebar extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      access: props.access
    };
  }
  render() {
    console.log('Access', this.state.access);
    return (
      <div>
        <DocumentSidebar {...this.state}/>
        {this.state.access.user.roleId <= 2 && <AdminSidebar />}
      </div>
    );
  }
}

export default connect(state => ({ access: state.userAccess }))(Sidebar);
