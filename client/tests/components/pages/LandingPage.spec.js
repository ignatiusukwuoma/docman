import expect from 'expect';
import sinon from 'sinon';
import React from 'react';
import { shallow, mount } from 'enzyme';
import { LandingPage } from
'../../../components/pages/LandingPage.jsx';

const signup = sinon.spy(() => Promise.resolve());
const signin = sinon.spy(() => Promise.resolve());
const spyHandleChange = sinon.spy(LandingPage.prototype, 'handleChange');
const spySignInChange = sinon.spy(LandingPage.prototype, 'handleSigninChange');
const spyPasswordChange = sinon
  .spy(LandingPage.prototype, 'handleConfirmPassword');

const state = {
  confirmPassword: '',
  signupDetails: { name: 'Ignatius' },
  signinDetails: {},
  signupErrors: {},
  signinErrors: {}
};

const props = {
  user: {},
  pathname: '',
  loggedIn: false,
  signup,
  signin
};

describe('LandingPage', () => {
  it('renders the login tabs component', () => {
    const wrapper = shallow(<LandingPage {...props} {...state} />,
      { context: { router: { push: () => {} } } });
    expect(wrapper.find('LoginTabs').length).toBe(1);
  });

  it('renders the login tabs component', () => {
    const wrapper = shallow(<LandingPage {...props} {...state} />,
      { context: { router: { push: () => {} } } });
    const spy = sinon.spy(LandingPage.prototype, 'componentWillReceiveProps');
    wrapper.setProps({ loggedIn: true });
    expect(spy.calledOnce).toBe(true);
  });

  it('can handle change in the signin form', () => {
    const wrapper = shallow(<LandingPage {...props} {...state} />,
      { context: { router: { push: () => {} } } });
    wrapper.instance().handleSigninChange({
      target: { name: 'name', value: 'Ignatius' }
    });
    expect(spySignInChange.calledOnce).toBe(true);
  });

  it('can handle change in the signup form', () => {
    const wrapper = shallow(<LandingPage {...props} {...state} />,
      { context: { router: { push: () => {} } } });
    wrapper.instance().handleChange({
      target: { name: 'name', value: 'Ignatius' }
    });
    expect(spyHandleChange.calledOnce).toBe(true);
  });

  it('can handle change in the confirm password field', () => {
    const wrapper = shallow(<LandingPage {...props} {...state} />,
      { context: { router: { push: () => {} } } });
    wrapper.instance().handleConfirmPassword({
      target: { value: 'password' }
    });
    expect(spyPasswordChange.calledOnce).toBe(true);
  });

  it('does not submit the signup form if a required field is missing', () => {
    const wrapper = shallow(<LandingPage {...props} {...state} />,
      { context: { router: { push: () => {} } } });
    wrapper.instance().onSubmit({ preventDefault: () => {} });
    expect(signup.calledOnce).toBe(false);
  });

  it('can submit the signup form', () => {
    const wrapper = shallow(<LandingPage {...props} {...state} />,
      { context: { router: { push: () => {} } } });
    wrapper.setState({
      signupDetails: {
        name: 'Ig Uk', username: 'inc', email: 'inc@in.com', password: 'pass'
      },
      confirmPassword: 'pass'
    });
    wrapper.instance().onSubmit({ preventDefault: () => {} });
    expect(signup.calledOnce).toBe(true);
  });

  it('does not submit the signin form if a required field is empty', () => {
    const wrapper = shallow(<LandingPage {...props} {...state} />,
      { context: { router: { push: () => {} } } });
    wrapper.instance().onSigninSubmit({ preventDefault: () => {} });
    expect(signin.calledOnce).toBe(false);
  });

  it('can submit the signin form', () => {
    const wrapper = shallow(<LandingPage {...props} {...state} />,
      { context: { router: { push: () => {} } } });
    wrapper.setState({
      signinDetails: {
        username: 'inc', password: 'pass'
      }
    });
    wrapper.instance().onSigninSubmit({ preventDefault: () => {} });
    expect(signin.calledOnce).toBe(true);
  });
});
