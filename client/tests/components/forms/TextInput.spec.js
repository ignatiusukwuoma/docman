import expect from 'expect';
import React from 'react';
import { shallow } from 'enzyme';
import TextInput from '../../../components/forms/TextInput.jsx';

function setup(errorText, value = 'ignatius@gmail.com') {
  const props = {
    name: 'email',
    type: 'text',
    value,
    errorText,
    handleChange: () => {},
    floatingLabelText: 'Email'
  };

  return shallow(<TextInput {...props} />);
}

describe('TextInput', () => {
  it('renders a div with class of input-field', () => {
    const wrapper = setup();
    expect(wrapper.find('.input-field').length).toBe(1);
    expect(wrapper.find('div').length).toBe(1);
  });

  it('takes in the name prop sent from parent', () => {
    const wrapper = setup();
    expect(wrapper.find('input').prop('name')).toBe('email');
  });

  it('correctly gets the value', () => {
    const wrapper = setup();
    expect(wrapper.find('input')
      .prop('value')).toBe('ignatius@gmail.com');
  });

  it('correctly initializes the input component', () => {
    const wrapper = setup();
    expect(wrapper.find('input').prop('errorText')).toBe(undefined);
  });

  it('displays error if errorText is passed', () => {
    const wrapper = setup('Passwords must match');
    expect(wrapper.find('.red-text').length).toBe(1);
    expect(wrapper.find('div').length).toBe(2);
  });
});
