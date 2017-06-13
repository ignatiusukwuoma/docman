import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import SignupForm from '../forms/SignupForm.jsx';
import SigninForm from '../forms/SigninForm.jsx';
import * as userActions from '../../actions/userActions';

class LandingPage extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.onSubmit = this.onSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.onSigninSubmit = this.onSigninSubmit.bind(this);
    this.handleSigninChange = this.handleSigninChange.bind(this);
    this.state = {
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

  handleSigninChange(event) {
    const signinDetails = this.state.signinDetails;
    signinDetails[event.target.name] = event.target.value;
    this.setState({ signinDetails });
  }

  onSubmit(event) {
    event.preventDefault();
    this.props.actions.signup(this.state.signupDetails)
    .then(() => this.context.router.push('/home'))
    .catch(e => console.log(e));
  }

  onSigninSubmit(event) {
    event.preventDefault();
    this.props.actions.signin(this.state.signinDetails)
    .then(() => this.context.router.push('/home'))
    .catch(e => console.log(e));
  }


  render() {
    return (
      <div>
        <div id="landing-nav">
          <h2>Docman Pro</h2>
        </div>
        <div id="about">
          <h2>Docman Pro Info</h2>
        </div>
        <div id="forms">
          <SigninForm
            onSigninSubmit={this.onSigninSubmit}
            handleSigninChange={this.handleSigninChange}
            signinDetails={this.state.signinDetails}
          />
          <SignupForm
            onSubmit={this.onSubmit}
            handleChange={this.handleChange}
            signupDetails={this.state.signupDetails}
          />
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
