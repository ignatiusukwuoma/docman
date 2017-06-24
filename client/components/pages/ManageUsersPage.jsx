import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Divider from 'material-ui/Divider';
import { Card } from 'material-ui/Card';
import {
  Table, TableBody, TableHeader, TableHeaderColumn,
  TableRow, TableRowColumn } from 'material-ui/Table';
import Nav from '../layouts/Nav.jsx';
import Sidebar from '../layouts/Sidebar.jsx';
import Searchbar from '../forms/Searchbar.jsx';
import Pagination from '../elements/Pagination.jsx';
import * as userActions from '../../actions/userActions';
import * as searchActions from '../../actions/searchActions';
import insertRole from '../../utils/insertRole';

/**
 * Controller component to manage users
 * @class ManageUsersPage
 * @extends {React.Component}
 */
class ManageUsersPage extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      users: [...props.users],
      pageData: Object.assign({}, props.pageData),
      usersLoaded: false
    };
    this.nextPage = this.nextPage.bind(this);
    this.prevPage = this.prevPage.bind(this);
  }

  /**
   * Call to get users before component mounts
   * @memberOf ManageUsersPage
   */
  componentWillMount() {
    this.props.actions.getUsers();
  }

  /**
   * Update state with props
   * @param {object} nextProps
   * @memberOf ManageUsersPage
   */
  componentWillReceiveProps(nextProps) {
    if (this.props.pageData !== nextProps.pageData) {
      this.setState({
        users: [...nextProps.users],
        pageData: Object.assign({}, nextProps.pageData),
        usersLoaded: true
      });
    }
  }

  /**
   * Next page function for validation
   * @returns {function} action call
   * @memberOf ManageUsersPage
   */
  nextPage() {
    if (this.state.users.length < 9) {
      return;
    }
    if (this.state.pageData.query) {
      return this.props.actions.searchUsers(this.state.pageData.query,
        this.state.pageData.offset + 9);
    }
    return this.props.actions.getUsers(this.state.pageData.offset + 9);
  }

  /**
   * Previous page function for validation
   * @returns {function} action call
   * @memberOf ManageUsersPage
   */
  prevPage() {
    if (this.state.pageData.offset < 1) {
      return;
    }
    if (this.state.pageData.query) {
      return this.props.actions.searchUsers(this.state.pageData.query,
        this.state.pageData.offset - 9);
    }
    return this.props.actions.getUsers(this.state.pageData.offset - 9);
  }

  /**
   * Place retrieved users on the component
   * @memberOf ManageUsersPage
   */
  placeUsers = (user) =>
    <TableRow key={user.id}>
      <TableRowColumn>{user.id}</TableRowColumn>
      <TableRowColumn>{user.name}</TableRowColumn>
      <TableRowColumn>{user.username}</TableRowColumn>
      <TableRowColumn>{insertRole(user.roleId)}</TableRowColumn>
      <TableRowColumn><Link to={`/user/${user.id}`}>
        Visit Profile</Link></TableRowColumn>
    </TableRow>;

  /**
   * Renders the ManageUsers page
   * @returns {object} jsx
   * @memberOf ManageUsersPage
   */
  render() {
    return (
      <div className="users-page">
        <div className="row">
          <div className="col s12 m4 l3">
            <Sidebar />
          </div>
          <div className="col s12 m8 l9">
            <div className="row">
              <div className="headers">
                <h3> Users </h3>
                <Searchbar />
              </div>
              <Card className="users-card">
                <Table className="animated zoomIn">
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
                  {this.state.users
                  && this.state.users.map(this.placeUsers)}
                  </TableBody>
                </Table>
              </Card>
            </div>
            {this.state.usersLoaded
            && <Pagination
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
  users: PropTypes.array.isRequired,
  pageData: PropTypes.object.isRequired,
  access: PropTypes.object.isRequired
};

/**
 * Make state available as props
 * @param {object} state
 * @param {object} ownProps
 * @returns {object} props
 */
function mapStateToProps(state, ownProps) {
  return {
    users: state.users,
    pageData: state.pageData,
    access: state.userAccess
  };
}

/**
 * Make actions available as props
 * @param {function} dispatch
 * @returns {function} action
 */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(
      Object.assign(userActions, searchActions),
      dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageUsersPage);
