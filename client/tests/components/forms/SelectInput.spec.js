import expect from 'expect';
import React from 'react';
import { shallow } from 'enzyme';
import SelectInput from '../../../components/forms/SelectInput.jsx';

function setup(id, error = '', pathname) {
  const props = {
    id,
    name: '',
    error,
    access: { user: { roleId: 1 } },
    pathname,
    handleChange: () => {},
    value: 'public'
  };

  return shallow(<SelectInput {...props} />);
}

describe('SelectInput', () => {
  it('renders a div element', () => {
    const wrapper = setup();
    expect(wrapper.find('div').length).toBe(1);
  });

  it('renders a select field', () => {
    const wrapper = setup();
    expect(wrapper.find('select').length).toBe(1);
  });

  it('accepts the id prop sent to it from the parent', () => {
    const wrapper = setup('select-box');
    expect(wrapper.find('select').prop('id')).toBe('select-box');
  });

  it('displays an error message when error is truthy', () => {
    const wrapper = setup('select-box', 'Error message');
    expect(wrapper.find('.red-text').text()).toBe('Error message');
    expect(wrapper.find('div').length).toBe(2);
  });

  it('does not display a second div when error is falsy', () => {
    const wrapper = setup('select-box', null);
    expect(wrapper.find('div').length).toBe(1);
  });

  it('display the select role field when user is superadmin', () => {
    const wrapper = setup('select-box', null, '/user/5/edit');
    expect(wrapper.find('option').length).toBe(3);
  });

  it('does not display select role field for other users', () => {
    const wrapper = setup('select-box', null, '/');
    expect(wrapper.find('option').length).toBe(4);
  });
});
