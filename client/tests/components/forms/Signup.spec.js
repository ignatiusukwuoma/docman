import expect from 'expect';
import React from 'react';
import { shallow } from 'enzyme';
import SignupForm from '../../../components/forms/SignupForm.jsx';

function setup() {
  const props = {
    signupDetails: {
      name: '',
      email: '',
      username: '',
      password: ''
    },
    onSubmit: () => {},
    handleChange: () => {},
    signupErrors: {}
  };

  return shallow(<SignupForm {...props} />);
}

describe('SignupForm', () => {
  it('renders a form', () => {
    const wrapper = setup();
    expect(wrapper.find('form').length).toBe(1);
  });

  it('renders 5 text inputs', () => {
    const wrapper = setup();
    expect(wrapper.find('TextInput').length).toEqual(5);
  });

  it('renders the create an account button', () => {
    const wrapper = setup();
    expect(wrapper.find('FlatButton').length).toEqual(1);
    // expect(wrapper.find('FlatButton').prop('label')).toBe('Create an Account');
  });

  it('renders a text input for name', () => {
    const wrapper = setup();
    expect(wrapper.find('TextInput').at(0).prop('name')).toBe('name');
  });

  it('renders a text input for the email', () => {
    const wrapper = setup();
    expect(wrapper.find('TextInput').at(1).prop('name')).toBe('email');
  });

  it('renders a text input for the username', () => {
    const wrapper = setup();
    expect(wrapper.find('TextInput').at(2).prop('name')).toBe('username');
  });

  it('renders a text input for the password', () => {
    const wrapper = setup();
    expect(wrapper.find('TextInput').at(3).prop('name')).toBe('password');
  });
});
