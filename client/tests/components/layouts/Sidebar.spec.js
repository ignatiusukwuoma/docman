import expect from 'expect';
import sinon from 'sinon';
import React from 'react';
import { shallow, mount } from 'enzyme';
import { Sidebar } from '../../../components/layouts/Sidebar.jsx';

const logout = sinon.spy(() => Promise.resolve());
const deleteUser = sinon.spy(() => Promise.resolve());
const swal = sinon.spy(() => Promise.resolve());

const props = {
  user: { id: 3 },
  access: { user: { roleId: 2 } },
  logout,
  deleteUser
};

describe('Sidebar Component', () => {
  it('renders the document sidebar', () => {
    const wrapper = shallow(<Sidebar {...props} />,
    { context: { router: { push: () => {} } } });
    expect(wrapper.find('DocumentSidebar').length).toBe(1);
  });

  it('renders the admin sidebar for admins', () => {
    const wrapper = shallow(<Sidebar {...props} />,
    { context: { router: { push: () => {} } } });
    expect(wrapper.find('AdminSidebar').length).toBe(1);
  });

  it('correctly passes in props', () => {
    const wrapper = shallow(<Sidebar {...props} />,
    { context: { router: { push: () => {} } } });
    expect(wrapper.find('AdminSidebar').props().access)
      .toEqual(wrapper.state('access'));
  });

  it('does not render the admin sidebar for non-admins', () => {
    props.access.user.roleId = 3;
    const wrapper = shallow(<Sidebar {...props} />,
    { context: { router: { push: () => {} } } });
    expect(wrapper.find('AdminSidebar').length).toBe(0);
  });

  it('updates the user in state if user id changes', () => {
    const spy = sinon.spy(Sidebar.prototype, 'componentWillReceiveProps');
    const wrapper = shallow(<Sidebar {...props} />,
    { context: { router: { push: () => {} } } });
    wrapper.setProps({ user: { id: 4 } });
    expect(wrapper.state().user).toEqual({ id: 4 });
    expect(spy.calledOnce).toEqual(true);
  });

  it('deletes a user when delete functions runs', () => {
    const wrapper = shallow(<Sidebar {...props} />,
    { context: { router: { push: () => {} } } });
    wrapper.instance().delete();
    expect(deleteUser.calledOnce).toBe(true);
  });

});
