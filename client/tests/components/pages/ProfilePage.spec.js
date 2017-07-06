import expect from 'expect';
import sinon from 'sinon';
import React from 'react';
import { shallow, mount } from 'enzyme';
import { ProfilePage } from
'../../../components/pages/ProfilePage.jsx';

const getUser = sinon.spy(() => Promise.resolve());
const getUserDocuments = sinon.spy(() => Promise.resolve());
const nextPage = sinon.spy(ProfilePage.prototype, 'nextPage');
const prevPage = sinon.spy(ProfilePage.prototype, 'prevPage');

const state = {
  documentsLoaded: false
};

const props = {
  params: { id: 4 },
  user: {},
  documents:[
    { title: 'The growth of Software Technology in Nigeria and Africa',
      content: 'Nigeria has experienced...' }
  ],
  pageData: { offset: 0 },
  access: {},
  actions: {
    getUser,
    getUserDocuments
  }
};

describe('ProfilePage', () => {
  it('renders a div with class home-page', () => {
    const wrapper = shallow(<ProfilePage {...props} />);
    expect(wrapper.find('.home-page').length).toBe(1);
  });

  it('updates the documents in state if pageData changes', () => {
    const spy = sinon.spy(ProfilePage.prototype,
    'componentWillReceiveProps');
    const wrapper = shallow(<ProfilePage {...props} />);
    wrapper.setProps({
      pageData: { count: 3, pageNumber: 1, pageSize: 3, totalPages: 1 }
    });
    expect(wrapper.state().pageData).toEqual(
      { count: 3, pageNumber: 1, pageSize: 3, totalPages: 1 }
    );
    expect(spy.calledOnce).toEqual(true);
  });

  it('calls nextPage when next page function runs', () => {
    const wrapper = shallow(<ProfilePage {...props} />);
    wrapper.instance().nextPage();
    expect(nextPage.calledOnce).toEqual(true);
  });

  it('calls getUserDocuments when documents are greater than 9', () => {
    const wrapper = shallow(<ProfilePage {...props} />);
    wrapper.setState({ documents:[
      { title: 'A', content: 'A' },
      { title: 'B', content: 'A' },
      { title: 'C', content: 'A' },
      { title: 'D', content: 'A' },
      { title: 'E', content: 'A' },
      { title: 'F', content: 'A' },
      { title: 'G', content: 'A' },
      { title: 'H', content: 'A' },
      { title: 'I', content: 'A' },
      { title: 'J', content: 'A' },
      { title: 'K', content: 'A' }] });
    wrapper.instance().nextPage();
    expect(getUserDocuments.called).toBe(true);
  });

  it('calls prevPage when prev page function runs', () => {
    const wrapper = shallow(<ProfilePage {...props} />);
    wrapper.instance().prevPage();
    expect(prevPage.calledOnce).toEqual(true);
  });

  it('calls getUserDocuments when documents are greater than 9', () => {
    const wrapper = shallow(<ProfilePage {...props} />);
    wrapper.setState({ documents:[
      { title: 'A', content: 'A' },
      { title: 'B', content: 'A' },
      { title: 'C', content: 'A' },
      { title: 'D', content: 'A' },
      { title: 'E', content: 'A' }],
      pageData: {
        count: 3, pageNumber: 1, totalPages: 1, offset: 9
      }
    });
    wrapper.instance().prevPage();
    expect(getUserDocuments.called).toBe(true);
  });
});
