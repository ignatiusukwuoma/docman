import expect from 'expect';
import React from 'react';
import { mount } from 'enzyme';
import { IsSuperAdmin } from '../../../components/protectors/IsSuperAdmin';

const props = {
  access: { loggedIn: true, user: { roleId: 1 } },
  children: <input />
};

describe('IsSuperAdmin Component', () => {
  it('renders the children if the user is a super admin', () => {
    const wrapper = mount(<IsSuperAdmin {...props} />,
      { context: { router: { push: () => {} } } });
    expect(wrapper.find('input').length).toBe(1);
  });

  it('does not render the children if the user is not a super admin', () => {
    props.access.user.roleId = 2;
    const wrapper = mount(<IsSuperAdmin {...props} />,
      { context: { router: { push: () => {} } } });
    expect(wrapper.find('input').length).toBe(0);
  });

  it('does not render the children if the user is not an admin', () => {
    props.access.user.loggedIn = false;
    const wrapper = mount(<IsSuperAdmin {...props} />,
      { context: { router: { push: () => {} } } });
    expect(wrapper.find('input').length).toBe(0);
  });
});
