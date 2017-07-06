import React from 'react';
import expect from 'expect';
import sinon from 'sinon';
import { shallow, mount } from 'enzyme';
import { Nav } from '../../../components/layouts/Nav.jsx';

const logout = sinon.spy(() => Promise.resolve());

function setup(signedIn = false) {
  const props = {
    access: { loggedIn: signedIn, user: {} },
    logout
  };
  return mount(<Nav {...props} />);
}

describe('Nav', () => {
  it('renders only one nav and one div', () => {
    const wrapper = setup();
    expect(wrapper.find('nav').length).toBe(1);
    expect(wrapper.find('div').length).toBe(1);
    expect(wrapper.find('a').length).toBe(1);
  });

  it('renders two divs when user is logged in', () => {
    const wrapper = setup(true);
    expect(wrapper.find('div').length).toBe(2);
    expect(wrapper.find('a').length).toBe(2);
  });

  it('should logout when logout button is clicked', () => {
    const wrapper = setup(true);
    const logoutButton = wrapper.find('a').last();
    expect(logoutButton.text()).toBe('Logout');
    logoutButton.simulate('click');
    expect(logout.callCount).toEqual(1);
  });
});
