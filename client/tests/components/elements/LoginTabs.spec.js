import React from 'react';
import expect from 'expect';
import { shallow } from 'enzyme';
import LoginTabs from '../../../components/elements/LoginTabs';

function setup() {
  const props = {
    onSigninSubmit: () => {},
    handleSigninChange: () => {},
    signinDetails: {},
    signinErrors: {},
    pathname: '/',
    onSubmit: () => {},
    handleChange: () => {},
    signupDetails: {},
    signupErrors: {},
    handleConfirmPassword: () => {},
    confirmPassword: ''
  };

  return shallow(<LoginTabs {...props} />);
}

describe('LoginTabs', () => {
  it('renders a div with className login-tabs', () => {
    const wrapper = setup();
    expect(wrapper.find('.login-tabs').length).toBe(1);
  });

  it('renders a SigninForm', () => {
    const wrapper = setup();
    expect(wrapper.find('SigninForm').length).toBe(1);
  });

  it('renders a SignupForm', () => {
    const wrapper = setup();
    expect(wrapper.find('SignupForm').length).toBe(1);
  });
});
