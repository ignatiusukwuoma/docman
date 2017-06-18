import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router';
import { CSSTransitionGroup } from 'react-transition-group';
import Divider from 'material-ui/Divider';
import { Card } from 'material-ui/Card';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import Nav from '../layouts/Nav.jsx';
import Sidebar from '../layouts/Sidebar.jsx';
import Pagination from '../elements/Pagination.jsx';
import * as userActions from '../../actions/userActions';
import insertRole from '../../utils/insertRole';

class ManageUsersPage extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      users: [],
      pageData: {},
      usersLoaded: false
    };
    this.nextPage = this.nextPage.bind(this);
    this.prevPage = this.prevPage.bind(this);
  }

  componentWillMount() {
    this.props.actions.getUsers();
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      users: nextProps.users,
      pageData: nextProps.pageData,
      usersLoaded: true
    });
  }

  nextPage() {
    if (this.state.users.length < 9) return;
    return this.props.actions.getUsers(this.state.pageData.offset + 9);
  }

  prevPage() {
    if (this.state.pageData.offset < 1) return;
    return this.props.actions.getUsers(this.state.pageData.offset - 9);
  }

  placeUsers = (user) => {
    return (
      <TableRow key={user.id}>
        <TableRowColumn>{user.id}</TableRowColumn>
        <TableRowColumn>{user.name}</TableRowColumn>
        <TableRowColumn>{user.username}</TableRowColumn>
        <TableRowColumn>{insertRole(user.roleId)}</TableRowColumn>
        <TableRowColumn><Link to={`/users/${user.id}`}>
          Visit Profile</Link></TableRowColumn>
      </TableRow>
    );
  }

  render() {
    return (
      <div className="users-page">
        <div className="row">
          <div className="col s12 m4 l3">
            <Sidebar />
          </div>
          <div className="col s12 m8 l9">
            <div className="row">
              <CSSTransitionGroup
                transitionName="swim"
                transitionEnterTimeout={500}
                transitionLeaveTimeout={300}>
                <Card className="users-card">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHeaderColumn>ID</TableHeaderColumn>
                        <TableHeaderColumn>Name</TableHeaderColumn>
                        <TableHeaderColumn>Username</TableHeaderColumn>
                        <TableHeaderColumn>Role</TableHeaderColumn>
                        <TableHeaderColumn>Profile</TableHeaderColumn>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                    {this.state.users &&
                    this.state.users.map(this.placeUsers)}
                    </TableBody>
                  </Table>
                </Card>
              </CSSTransitionGroup>
            </div>
            {this.state.usersLoaded &&
            <Pagination
              documents={this.state.users}
              nextPage={this.nextPage}
              prevPage={this.prevPage}
              pageData={this.state.pageData} />}
          </div>
        </div>
      </div>
    );
  }
}

ManageUsersPage.propTypes = {
  actions: PropTypes.object.isRequired,
};

function mapStateToProps(state, ownProps) {
  return {
    users: state.users,
    pageData: state.pageData,
    access: state.userAccess
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(userActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageUsersPage);