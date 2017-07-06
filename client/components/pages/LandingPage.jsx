import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import toastr from 'toastr';
import LoginTabs from '../elements/LoginTabs.jsx';
import handleError from '../../utils/errorHandler';
import * as validate from '../../utils/validate';
import { signup, signin } from '../../actions/userActions';

/**
 * The Landing Page
 * @class LandingPage
 * @extends {React.Component}
 */
export class LandingPage extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.onSubmit = this.onSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.onSigninSubmit = this.onSigninSubmit.bind(this);
    this.handleSigninChange = this.handleSigninChange.bind(this);
    this.handleConfirmPassword = this.handleConfirmPassword.bind(this);
    this.state = {
      confirmPassword: '',
      signupErrors: {},
      signinErrors: {},
      signupDetails: {
        name: '',
        email: '',
        username: '',
        password: ''
      },
      signinDetails: {
        username: '',
        password: ''
      }
    };
  }

  /**
   * Updates state from props
   * @param {any} nextProps
   * @memberOf LandingPage
   */
  componentWillReceiveProps(nextProps) {
    if (nextProps.loggedIn) {
      this.context.router.push('/home');
    }
  }

  /**
   * Sets the signup form values in state
   * @param {object} event
   * @memberOf LandingPage
   */
  handleChange(event) {
    const signupDetails = this.state.signupDetails;
    signupDetails[event.target.name] = event.target.value.substr(0, 30);
    this.setState({ signupDetails });
  }

  /**
   * Sets confirm password field in state
   * @param {object} event
   * @memberOf LandingPage
   */
  handleConfirmPassword(event) {
    this.setState({ confirmPassword: event.target.value.substr(0, 30) });
  }

  /**
   * Sets the signin form values to state
   * @param {object} event
   * @memberOf LandingPage
   */
  handleSigninChange(event) {
    const signinDetails = this.state.signinDetails;
    signinDetails[event.target.name] = event.target.value.substr(0, 30);
    this.setState({ signinDetails });
  }

  /**
   * Submits the signup form
   * @param {object} event
   * @memberOf LandingPage
   */
  onSubmit(event) {
    event.preventDefault();
    const { valid, errors } = validate
      .signup(this.state.signupDetails, this.state.confirmPassword);
    if (valid) {
      this.props.signup(this.state.signupDetails)
      .then(() => {
        this.context.router.push('/home');
        toastr.success('You have signed up successfully');
      })
      .catch(error => handleError(error));
    } else {
      this.setState({ signupErrors: errors });
    }
  }

  /**
   * Submits the signin form
   * @param {object} event
   * @memberOf LandingPage
   */
  onSigninSubmit(event) {
    event.preventDefault();
    const { valid, errors } = validate
      .signin(this.state.signinDetails);
    if (valid) {
      this.props.signin(this.state.signinDetails)
      .then(() => {
        this.context.router.push('/home');
        toastr.success('You are successfully logged in');
      })
      .catch(error => handleError(error));
    } else {
      this.setState({ signinErrors: errors });
    }
  }

  /**
   * Renders the landing page
   * @returns {object} jsx
   * @memberOf LandingPage
   */
  render() {
    return (
      <div className="landing-page">
        <div className="container">
          <div className="row landing-content">
            <div className="col s12 m7 l8">
              <div className="about">
                <h4>Looking for a way to manage your documents
                  all in one place</h4>
                <h5> Welcome to the
                <p><strong> Document Management System </strong></p>
                  for Professionals </h5>
              </div>
            </div>
            <div className="col s12 m5 l4">
              <div className="forms">
                <LoginTabs
                  onSigninSubmit={this.onSigninSubmit}
                  signinDetails={this.state.signinDetails}
                  signinErrors={this.state.signinErrors}
                  handleSigninChange={this.handleSigninChange}
                  pathname={this.props.pathname}
                  onSubmit={this.onSubmit}
                  handleChange={this.handleChange}
                  signupErrors={this.state.signupErrors}
                  signupDetails={this.state.signupDetails}
                  confirmPassword={this.state.confirmPassword}
                  handleConfirmPassword={this.handleConfirmPassword}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

LandingPage.propTypes = {
  pathname: PropTypes.string.isRequired,
  loggedIn: PropTypes.bool,
  user: PropTypes.object,
  signup: PropTypes.func.isRequired,
  signin: PropTypes.func.isRequired
};

LandingPage.contextTypes = {
  router: PropTypes.object.isRequired
};

/**
 * Makes state available as props
 * @param {object} state
 * @param {object} ownProps
 * @returns {object} props
 */
function mapStateToProps(state, ownProps) {
  const pathname = ownProps.location.pathname;
  return {
    pathname,
    loggedIn: state.userAccess.loggedIn,
    user: state.user
  };
}

export default connect(mapStateToProps, { signup, signin })(LandingPage);
