import React from 'react';
import expect from 'expect';
import sinon from 'sinon';
import { shallow } from 'enzyme';
import ProfileSidebar from '../../../components/layouts/ProfileSidebar';

const deleteUser = sinon.spy(() => Promise.resolve());

function setup(roleId = 2, id = 2) {
  const props = {
    access: { user: { roleId, id, username: 'josh' } },
    user: { id: 1, username: 'income', roleId: 1 },
    deleteUser
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

  it('renders a CardAction with buttons if user is Admin', () => {
    const wrapper = setup(1);
    expect(wrapper.find('CardActions').length).toBe(1);
    expect(wrapper.find('Link').length).toBe(1);
  });

  it('renders a delete button if user owns the profile', () => {
    const wrapper = setup(1, 1);
    expect(wrapper.find('a').length).toBe(1);
    expect(wrapper.find('RaisedButton').length).toBe(2);
    const deleteButton = wrapper.find('RaisedButton').last();
    expect(deleteButton.props().label).toBe('DELETE');
    wrapper.find('a').simulate('click');
    expect(deleteUser.calledOnce).toBe(true);
  });
});
