import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router';
import Divider from 'material-ui/Divider';
import { Card } from 'material-ui/Card';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import Nav from '../layouts/Nav.jsx';
import Sidebar from '../layouts/Sidebar.jsx';
import * as roleActions from '../../actions/roleActions';
import insertRole from '../../utils/insertRole';

class ManageRolesPage extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = { roles: [] };
  }

  componentWillMount() {
    this.props.actions.getRoles();
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      roles: nextProps.roles
    });
  }


  placeRoles = (role) => {
    return (
      <TableRow key={role.id}>
        <TableRowColumn>{role.id}</TableRowColumn>
        <TableRowColumn>{role.title}</TableRowColumn>
        <TableRowColumn>
          <Link to="">
            <i className="material-icons">delete_forever</i>
          </Link>
        </TableRowColumn>
      </TableRow>
    );
  }

  render() {
    return (
      <div className="roles-page">
        <div className="row">
          <div className="col s12 m4 l3">
            <Sidebar />
          </div>
          <div className="col s12 m8 l9">
            <div className="row">
              <Card className="roles-card">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHeaderColumn>ID</TableHeaderColumn>
                      <TableHeaderColumn>Title</TableHeaderColumn>
                      <TableHeaderColumn>Actions</TableHeaderColumn>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                  {this.state.roles &&
                  this.state.roles.map(this.placeRoles)}
                  </TableBody>
                </Table>
              </Card>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

ManageRolesPage.propTypes = {
  actions: PropTypes.object.isRequired,
};

function mapStateToProps(state, ownProps) {
  return {
    roles: state.roles,
    access: state.userAccess
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(roleActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageRolesPage);
