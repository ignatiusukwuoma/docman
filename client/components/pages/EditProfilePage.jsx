import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import toastr from 'toastr';
import SignupForm from '../forms/SignupForm.jsx';
import handleError from '../../utils/errorHandler';
import * as validate from '../../utils/validate';
import { updateUser } from '../../actions/userActions';
import Sidebar from '../layouts/Sidebar.jsx';

/**
 * Controls the edit profile page
 * @class EditProfilePage
 * @extends {React.Component}
 */
export class EditProfilePage extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.onSubmit = this.onSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      editprofileErrors: {},
      editprofileDetails: {
        name: `${props.user.name}`,
        email: `${props.user.email}`,
        username: `${props.user.username}`,
        roleId: `${props.user.roleId}`
      }
    };
  }
  componentDidMount() {
    $('select').material_select();
    $('#select-role').on('change', this.handleChange);
  }

  /**
   * Sets the form value to state
   * @param {object} event
   * @memberOf EditProfilePage
   */
  handleChange(event) {
    const editprofileDetails = this.state.editprofileDetails;
    editprofileDetails[event.target.name] = event.target.value.substr(0, 30);
    this.setState({ editprofileDetails });
  }

  /**
   * Submits the form to edit profile
   * @param {object} event
   * @memberOf EditProfilePage
   */
  onSubmit(event) {
    event.preventDefault();
    const { valid, errors } = validate.editprofile(this
    .state.editprofileDetails);
    if (valid) {
      this.props.updateUser(this.props.user.id, this.state.editprofileDetails)
      .then(() => {
        this.context.router.push(`/user/${this.props.user.id}`);
        toastr.success('Profile updated successfully');
      })
      .catch(error => handleError(error));
    } else {
      this.setState({ editprofileErrors: errors });
    }
  }

  /**
   * Renders the edit profile page
   * @returns {object} jsx
   * @memberOf EditProfilePage
   */
  render() {
    const { pathname, user, access } = this.props;
    return (
      <div className="edit-profile-page">
        <div className="row">
          <div className="col s12 m4 l3">
            <Sidebar />
          </div>
          <div className="col s12 m8 l9 center-align center-all">
            <div className="headers">
              <h4> Edit Your Profile </h4>
            </div>
            <div className="edit-profile-form">
              <SignupForm
                disabled={access.user.id !== user.id}
                access={access}
                pathname={pathname}
                onSubmit={this.onSubmit}
                handleChange={this.handleChange}
                signupErrors={this.state.editprofileErrors}
                signupDetails={this.state.editprofileDetails}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

EditProfilePage.propTypes = {
  user: PropTypes.object,
  access: PropTypes.object.isRequired,
  pathname: PropTypes.string.isRequired
};

EditProfilePage.contextTypes = {
  router: PropTypes.object
};

/**
 * Make the state available in props
 * @param {object} state
 * @param {object} ownProps
 * @returns {object} pathname and user
 */
function mapStateToProps(state, ownProps) {
  const pathname = ownProps.location.pathname;
  return {
    pathname,
    user: state.user,
    access: state.userAccess
  };
}

export default connect(mapStateToProps, { updateUser })(EditProfilePage);
