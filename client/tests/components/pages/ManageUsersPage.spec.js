import expect from 'expect';
import sinon from 'sinon';
import React from 'react';
import { shallow, mount } from 'enzyme';
import { ManageUsersPage } from
'../../../components/pages/ManageUsersPage.jsx';

const getUsers = sinon.spy(() => Promise.resolve());
const searchUsers = sinon.spy(() => Promise.resolve());
const nextPage = sinon.spy(ManageUsersPage.prototype, 'nextPage');
const prevPage = sinon.spy(ManageUsersPage.prototype, 'prevPage');

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

  it('calls nextPage when next page function runs', () => {
    const wrapper = shallow(<ManageUsersPage {...props} {...state} />);
    wrapper.instance().nextPage();
    expect(nextPage.calledOnce).toEqual(true);
  });

  it('calls getUsers when users are greater than 9', () => {
    const wrapper = shallow(<ManageUsersPage {...props} {...state} />);
    wrapper.setState({ users:[
      { name: 'A' },
      { name: 'B' },
      { name: 'C' },
      { name: 'D' },
      { name: 'E' },
      { name: 'F' },
      { name: 'G' },
      { name: 'H' },
      { name: 'I' },
      { name: 'J' },
      { name: 'K' }] });
    wrapper.instance().nextPage();
    expect(getUsers.called).toBe(true);
  });

  it('calls prevPage when prev page function runs', () => {
    const wrapper = shallow(<ManageUsersPage {...props} {...state} />);
    wrapper.instance().prevPage();
    expect(prevPage.calledOnce).toEqual(true);
  });

  it('calls searchUsers when there is a query', () => {
    const wrapper = shallow(<ManageUsersPage {...props} {...state} />);
    wrapper.setState({ users:[
      { name: 'A' },
      { name: 'B' },
      { name: 'C' },
      { name: 'D' },
      { name: 'E' },
      { name: 'F' },
      { name: 'G' }],
      pageData: {
        count: 3, pageNumber: 1, totalPages: 1, offset: 9, query:'ignatius'
      }
    });
    wrapper.instance().prevPage();
    expect(searchUsers.called).toBe(true);
  });

  it('calls getUsers when users are greater than 9', () => {
    const wrapper = shallow(<ManageUsersPage {...props} />);
    wrapper.setState({ documents:[
      { name: 'A' },
      { name: 'B' },
      { name: 'C' },
      { name: 'D' },
      { name: 'E' }],
      pageData: {
        count: 3, pageNumber: 1, totalPages: 1, offset: 9
      }
    });
    wrapper.instance().prevPage();
    expect(getUsers.called).toBe(true);
  });
});
