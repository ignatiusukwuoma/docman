import expect from 'expect';
import sinon from 'sinon';
import React from 'react';
import { shallow, mount } from 'enzyme';
import { nextPage, prevPage } from '../../../utils/paginate';
import { ProfilePage } from
'../../../components/pages/ProfilePage.jsx';

const getUser = sinon.spy(() => Promise.resolve());
const getUserDocuments = sinon.spy(() => Promise.resolve());
const nextPageSpy = sinon.spy(nextPage);
const prevPageSpy = sinon.spy(prevPage);

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
});
