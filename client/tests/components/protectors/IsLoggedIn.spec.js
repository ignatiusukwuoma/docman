import expect from 'expect';
import React from 'react';
import { mount } from 'enzyme';
import { IsLoggedIn } from '../../../components/protectors/IsLoggedIn';

const props = {
  access: { loggedIn: true },
  children: <input />
};

describe('IsLoggedIn Component', () => {
  it('renders the children if the user is logged in', () => {
    const wrapper = mount(<IsLoggedIn {...props} />,
      { context: { router: { push: () => {} } } });
    expect(wrapper.find('input').length).toBe(1);
  });

  it('does not render the children if the user is not logged in', () => {
    props.access.loggedIn = false;
    const wrapper = mount(<IsLoggedIn {...props} />,
      { context: { router: { push: () => {} } } });
    expect(wrapper.find('input').length).toBe(0);
  });
});
