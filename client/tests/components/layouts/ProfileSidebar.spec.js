import React from 'react';
import expect from 'expect';
import { shallow } from 'enzyme';
import ProfileSidebar from '../../../components/layouts/ProfileSidebar.jsx';

function setup(roleId = 2, id = 2) {
  const props = {
    access: { user: { roleId, id, username: 'josh' } },
    user: { id: 1, username: 'income', roleId: 1 },
    deleteUser: () => {}
  };
  return shallow(<ProfileSidebar {...props}/>);
}

describe('ProfileSidebar', () => {
  it('renders a Card', () => {
    const wrapper = setup();
    expect(wrapper.find('Card').length).toBe(1);
  });

  it('renders a CardMedia', () => {
    const wrapper = setup();
    expect(wrapper.find('CardMedia').length).toBe(1);
  });

  it('renders a CardTitle', () => {
    const wrapper = setup();
    expect(wrapper.find('CardTitle').length).toBe(1);
  });

  it('renders a CardAction with buttons is user is Admin', () => {
    const wrapper = setup(1);
    expect(wrapper.find('CardActions').length).toBe(1);
    expect(wrapper.find('Link').length).toBe(1);
    expect(wrapper.find('a').length).toBe(1);
  });
});
