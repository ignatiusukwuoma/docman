import expect from 'expect';
import React from 'react';
import { mount } from 'enzyme';
import { IsAdmin } from '../../../components/protectors/IsAdmin.jsx';

const props = {
  access: { loggedIn: true, user: { roleId: 2 } },
  children: <input />
};

describe('IsAdmin Component', () => {
  it('renders the children if the user is an admin', () => {
    const wrapper = mount(<IsAdmin {...props} />,
      { context: { router: { push: () => {} } } });
    expect(wrapper.find('input').length).toBe(1);
  });

  it('does not render the children if the user is not an admin', () => {
    props.access.user.roleId = 3;
    const wrapper = mount(<IsAdmin {...props} />,
      { context: { router: { push: () => {} } } });
    expect(wrapper.find('input').length).toBe(0);
  });

  it('does not render the children if the user is not an admin', () => {
    props.access.user.loggedIn = false;
    const wrapper = mount(<IsAdmin {...props} />,
      { context: { router: { push: () => {} } } });
    expect(wrapper.find('input').length).toBe(0);
  });
});
