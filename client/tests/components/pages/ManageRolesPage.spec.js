import expect from 'expect';
import sinon from 'sinon';
import React from 'react';
import { shallow, mount } from 'enzyme';
import { ManageRolesPage } from
'../../../components/pages/ManageRolesPage.jsx';

const getRoles = sinon.spy(() => Promise.resolve());
const createRole = sinon.spy(() => Promise.resolve());
const updateRole = sinon.spy(() => Promise.resolve());
const deleteRole = sinon.spy(() => Promise.resolve());
const spyHandleChange = sinon.spy(ManageRolesPage.prototype, 'handleChange');
const spyEditChange = sinon.spy(ManageRolesPage.prototype, 'handleEditChange');
const spyEditButton = sinon.spy(ManageRolesPage.prototype, 'editButtonClick');
const spyDeleteRole = sinon.spy(ManageRolesPage.prototype, 'deleteRole');

const props = {
  roles: [{ id: 4, title: 'editor' }],
  access: { user: { roleId: 1 } },
  actions: {
    getRoles, createRole, updateRole, deleteRole
  }
};

const state = {
  newRole: {},
  editRole: {},
  roleToEdit: ''
};

describe('ManageRolesPage', () => {
  it('renders a Card', () => {
    const wrapper = shallow(<ManageRolesPage {...props} />);
    expect(wrapper.find('Card').length).toBe(1);
  });

  it('updates the roles in state if roles props changes', () => {
    const spy = sinon.spy(ManageRolesPage.prototype,
    'componentWillReceiveProps');
    const wrapper = shallow(<ManageRolesPage {...props} {...state} />);
    wrapper.setProps({
      roles: [{ title: 'superadmin' }]
    });
    expect(wrapper.state().roles).toEqual(
      [{ title: 'superadmin' }]
    );
    expect(spy.calledOnce).toEqual(true);
  });

  it('can handle change in the new role form', () => {
    const wrapper = shallow(<ManageRolesPage {...props} {...state} />);
    wrapper.instance().handleChange({
      preventDefault: () => {},
      target: { name: 'name', value: 'admin' }
    });
    expect(spyHandleChange.calledOnce).toBe(true);
  });

  it('can handle change in the edit role form', () => {
    const wrapper = shallow(<ManageRolesPage {...props} {...state} />);
    wrapper.instance().handleEditChange({
      preventDefault: () => {},
      target: { name: 'name', value: 'editor' }
    });
    expect(spyEditChange.calledOnce).toBe(true);
  });

  it('can submit the new roles form', () => {
    const wrapper = shallow(<ManageRolesPage {...props} {...state} />);
    wrapper.setState({
      newRole: { title: 'editor' }
    });
    wrapper.instance().onSubmit({ preventDefault: () => {} });
    expect(createRole.calledOnce).toBe(true);
  });

  it('can submit the edit roles form', () => {
    const wrapper = shallow(<ManageRolesPage {...props} {...state} />);
    wrapper.setState({
      editRole: { title: 'editor' },
      roleToEdit: 4
    });
    wrapper.instance().onEditSubmit({ preventDefault: () => {} });
    expect(updateRole.calledOnce).toBe(true);
  });

  it('saves the role data to state when edit button is clicked', () => {
    const wrapper = shallow(<ManageRolesPage {...props} {...state} />);
    wrapper.instance().editButtonClick(4, 'editor');
    expect(spyEditButton.calledOnce).toBe(true);
    expect(wrapper.state().roleToEdit).toBe(4);
    expect(wrapper.state().editRole.title).toBe('editor');
  });
});
