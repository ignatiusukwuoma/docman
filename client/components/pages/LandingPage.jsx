import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import toastr from 'toastr';
import SignupForm from '../forms/SignupForm.jsx';
import SigninForm from '../forms/SigninForm.jsx';
import handleError from '../../utils/errorHandler';
import * as validator from '../../utils/validator';
import * as userActions from '../../actions/userActions';

class LandingPage extends React.Component {
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

  componentWillReceiveProps(nextProps) {
    if (nextProps.loggedIn) {
      this.context.router.push('/home');
    }
  }

  handleChange(event) {
    const signupDetails = this.state.signupDetails;
    signupDetails[event.target.name] = event.target.value.substr(0, 30);
    this.setState({ signupDetails });
  }

  handleConfirmPassword(event) {
    this.setState({ confirmPassword: event.target.value.substr(0, 30) });
  }

  handleSigninChange(event) {
    const signinDetails = this.state.signinDetails;
    signinDetails[event.target.name] = event.target.value.substr(0, 30);
    this.setState({ signinDetails });
  }

  onSubmit(event) {
    event.preventDefault();
    const { valid, errors } = validator
    .signupValidator(this.state.signupDetails, this.state.confirmPassword);
    if (valid) {
      this.props.actions.signup(this.state.signupDetails)
      .then(() => {
        this.context.router.push('/home');
        toastr.success('You have signed up successfully');
      })
      .catch(error => handleError(error));
    } else {
      this.setState({ signupErrors: errors });
    }
  }

  onSigninSubmit(event) {
    event.preventDefault();
    const { valid, errors } = validator
      .signinValidator(this.state.signinDetails);
    if (valid) {
      this.props.actions.signin(this.state.signinDetails)
      .then(() => {
        this.context.router.push('/home');
        toastr.success('You are successfully logged in');
      })
      .catch(error => handleError(error));
    } else {
      this.setState({ signinErrors: errors });
    }
  }


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
                <h5> Login to your account </h5>
                <SigninForm
                  onSigninSubmit={this.onSigninSubmit}
                  signinDetails={this.state.signinDetails}
                  signinErrors={this.state.signinErrors}
                  handleSigninChange={this.handleSigninChange}
                />
                <h5> Create a new account </h5>
                <SignupForm
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
  actions: PropTypes.object.isRequired
};

LandingPage.contextTypes = {
  router: PropTypes.object.isRequired
};

function mapStateToProps(state, ownProps) {
  const pathname = ownProps.location.pathname;
  return {
    pathname,
    loggedIn: state.loggedIn,
    user: state.user
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(userActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(LandingPage);
