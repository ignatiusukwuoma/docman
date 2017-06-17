import React, {PropTypes} from 'react';
import { connect } from 'react-redux';
import {Card, CardActions, CardMedia, CardTitle} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import DocumentSidebar from './DocumentSidebar.jsx';
import AdminSidebar from './AdminSidebar.jsx';
import insertRole from '../../utils/insertRole';
import avatar from '../../img/avatar.png';

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
    return (
      <div className="sidebar profile">
        {this.state.user && location.pathname ===
        `/users/${this.state.user.id}` &&
        <Card>
          <CardMedia
            overlay={<CardTitle title={this.state.user.username}
            subtitle={this.state.user.email} />}>
            <img src={avatar} />
          </CardMedia>
          <CardTitle title={this.state.user.name}
            subtitle={insertRole(this.state.user.roleId)}
          />
          <CardActions>
            <RaisedButton label="EDIT PROFILE" primary={true} />
            <RaisedButton label="DELETE USER" secondary={true} />
          </CardActions>
        </Card>
        }
        <DocumentSidebar {...this.state}/>
        {this.state.access.user.roleId <= 2 && <AdminSidebar />}
      </div>
    );
  }
}


export default connect(state => ({ access: state.userAccess, user: state.user }))(Sidebar);
