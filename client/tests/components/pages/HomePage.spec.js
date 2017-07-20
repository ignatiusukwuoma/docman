import expect from 'expect';
import sinon from 'sinon';
import React from 'react';
import { shallow, mount } from 'enzyme';
import { nextPage, prevPage } from '../../../utils/paginate';
import { HomePage } from
'../../../components/pages/HomePage.jsx';

const getDocuments = sinon.spy(() => Promise.resolve());
const searchDocuments = sinon.spy(() => Promise.resolve());
const componentMount = sinon.spy(HomePage.prototype, 'componentWillMount');
const nextPageSpy = sinon.spy(nextPage);
const prevPageSpy = sinon.spy(prevPage);

const props = {
  documents:[
    { title: 'The growth of Software Technology in Nigeria and Africa',
      content: 'Nigeria has experienced...' }
  ],
  pageData: { offset: 0, query: 'a' },
  access: {},
  documentsLoaded: false,
  actions: {
    getDocuments,
    searchDocuments
  }
};

describe('HomePage', () => {
  it('renders a div with class home-page', () => {
    const wrapper = shallow(<HomePage {...props} />);
    expect(wrapper.find('.home-page').length).toBe(1);
  });

  it('updates the documents in state if pageData changes', () => {
    const spy = sinon.spy(HomePage.prototype,
    'componentWillReceiveProps');
    const wrapper = shallow(<HomePage {...props} />);
    wrapper.setProps({
      pageData: { count: 3, pageNumber: 1, pageSize: 3, totalPages: 1 }
    });
    expect(wrapper.state().pageData).toEqual(
      { count: 3, pageNumber: 1, pageSize: 3, totalPages: 1 }
    );
    expect(spy.calledOnce).toEqual(true);
  });

  it('calls nextPage when next page function runs', () => {
    const wrapper = shallow(<HomePage {...props} />);
    nextPageSpy(
      wrapper.state().documents,
      wrapper.instance().getDocuments,
      0,
      wrapper.state().pageData.offset,
      wrapper.state().pageData.query,
      wrapper.instance().searchDocuments
    );
    expect(nextPageSpy.callCount).toBe(1);
  });
});
