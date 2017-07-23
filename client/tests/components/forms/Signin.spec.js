import expect from 'expect';
import React from 'react';
import { shallow } from 'enzyme';
import SigninForm from '../../../components/forms/SigninForm';

function setup() {
  const props = {
    signinDetails: { username: '', errors: {}, password: '' },
    onSigninSubmit: () => {},
    handleSigninChange: () => {},
    signinErrors: {}
  };

  return shallow(<SigninForm {...props} />);
}

describe('SigninForm', () => {
  it('renders a form', () => {
    const wrapper = setup();
    expect(wrapper.find('form').length).toBe(1);
  });

  it('renders a text inputs for both username and password', () => {
    const wrapper = setup();
    expect(wrapper.find('TextInput').length).toEqual(2);
    expect(wrapper.find('TextInput').first().prop('name')).toBe('username');
    expect(wrapper.find('TextInput').last().prop('name')).toBe('password');
  });

  it('renders the login button', () => {
    const wrapper = setup();
    expect(wrapper.find('FlatButton').length).toEqual(1);
    expect(wrapper.find('FlatButton').prop('label')).toBe('Log In');
  });
});
