import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import SignupForm from '../forms/SignupForm.jsx';
import SigninForm from '../forms/SigninForm.jsx';
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
      },
    };
  }

  componentWillReceiveProps(nextProps) {
    console.log('NextProps', nextProps);
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
      .then(() => this.context.router.push('/home'))
      .catch(e => console.log(e));
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
      .then(() => this.context.router.push('/home'))
      .catch(e => console.log(e));
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
                <h6> Login to your account </h6>
                <SigninForm
                  onSigninSubmit={this.onSigninSubmit}
                  signinDetails={this.state.signinDetails}
                  signinErrors={this.state.signinErrors}
                  handleSigninChange={this.handleSigninChange}
                />
                <h6> Create a new account </h6>
                <SignupForm
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
  loggedIn: PropTypes.bool,
  user: PropTypes.object,
  actions: PropTypes.object.isRequired,
};

LandingPage.contextTypes = {
  router: PropTypes.object.isRequired
};

function mapStateToProps(state, ownProps) {
  console.log('State from container', state);
  return {
    loggedIn: state.loggedIn,
    user: state.user,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(userActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(LandingPage);
