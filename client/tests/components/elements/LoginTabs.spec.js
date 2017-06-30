import React from 'react';
import expect from 'expect';
import { shallow } from 'enzyme';
import enzymify from 'expect-enzyme';
import LoginTabs from '../../../components/elements/LoginTabs.jsx';

expect.extend(enzymify());

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
  it('renders one Tabs', () => {
    const wrapper = setup();
    expect(wrapper.find('Tabs').length).toBe(1);
  });

  it('renders two Tab', () => {
    const wrapper = setup();
    expect(wrapper.find('Tab').length).toBe(2);
  });
});
