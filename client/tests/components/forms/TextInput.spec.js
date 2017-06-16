import expect from 'expect';
import React from 'react';
import { shallow } from 'enzyme';
import TextInput from '../../../components/forms/TextInput.jsx';

function setup(fullWidth, value = 'ignatius@gmail.com') {
  const props = {
    name: 'email',
    type: 'text',
    value,
    hintText: '',
    fullWidth,
    errorText: '',
    onChange: () => {},
    floatingLabelText: '',
    floatingLabelFixed: false,
    floatingLabelStyle: {}
  };

  return shallow(<TextInput {...props} />);
}

describe('TextInput', () => {
  it('renders a TextField', () => {
    const wrapper = setup();
    expect(wrapper.find('TextField').length).toBe(1);
  });

  it('takes in the name prop sent from parent', () => {
    const wrapper = setup();
    expect(wrapper.find('TextField').prop('name')).toBe('email');
  });

  it('correctly gets the value', () => {
    const wrapper = setup();
    expect(wrapper.find('TextField').prop('value')).toBe('ignatius@gmail.com');
  });

  it('correctly initializes the input component', () => {
    const wrapper = setup(true);
    expect(wrapper.find('TextField').prop('fullWidth')).toBe(true);
  });
});
