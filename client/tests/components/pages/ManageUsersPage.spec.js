import expect from 'expect';
import sinon from 'sinon';
import React from 'react';
import { shallow, mount } from 'enzyme';
import { nextPage, prevPage } from '../../../utils/paginate';
import { ManageUsersPage } from
'../../../components/pages/ManageUsersPage';

const getUsers = sinon.spy(() => Promise.resolve());
const searchUsers = sinon.spy(() => Promise.resolve());
const nextPageSpy = sinon.spy(nextPage);
const prevPageSpy = sinon.spy(prevPage);

const props = {
  users: [{ name: 'Ignatius' }],
  pageData: { count: 1, pageNumber: 1, totalPages: 1, offset: 0 },
  access: {},
  actions: { getUsers, searchUsers }
};

const state = {
  usersLoaded: false
};

describe('ManageUsersPage', () => {
  it('renders a Card', () => {
    const wrapper = shallow(<ManageUsersPage {...props} {...state} />);
    expect(wrapper.find('Card').length).toBe(1);
  });

  it('updates the data in state if pageData props changes', () => {
    const spy = sinon.spy(ManageUsersPage.prototype,
    'componentWillReceiveProps');
    const wrapper = shallow(<ManageUsersPage {...props} {...state} />);
    wrapper.setProps({
      pageData: { count: 5 }
    });
    expect(wrapper.state().pageData).toEqual(
      { count: 5 }
    );
    expect(spy.calledOnce).toEqual(true);
  });
});
