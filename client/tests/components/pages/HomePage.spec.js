import expect from 'expect';
import sinon from 'sinon';
import React from 'react';
import { shallow, mount } from 'enzyme';
import { HomePage } from
'../../../components/pages/HomePage.jsx';

const getDocuments = sinon.spy(() => Promise.resolve());
const searchDocuments = sinon.spy(() => Promise.resolve());
const componentMount = sinon.spy(HomePage.prototype, 'componentWillMount');
const nextPage = sinon.spy(HomePage.prototype, 'nextPage');
const prevPage = sinon.spy(HomePage.prototype, 'prevPage');

const props = {
  documents:[
    { title: 'The growth of Software Technology in Nigeria and Africa',
      content: 'Nigeria has experienced...' }
  ],
  pageData: { offset: 0 },
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
    wrapper.instance().nextPage();
    expect(nextPage.calledOnce).toEqual(true);
  });

  it('calls getDocuments when documents are greater than 9', () => {
    const wrapper = shallow(<HomePage {...props} />);
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
    expect(getDocuments.called).toBe(true);
  });

  it('calls searchDocuments when there is a query', () => {
    const wrapper = shallow(<HomePage {...props} />);
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
      { title: 'K', content: 'A' }],
      pageData: {
        count: 3, pageNumber: 1, totalPages: 1, pageSize: 3, query:'andela'
      }
    });
    wrapper.instance().nextPage();
    expect(searchDocuments.calledOnce).toBe(true);
  });

  it('calls prevPage when prev page function runs', () => {
    const wrapper = shallow(<HomePage {...props} />);
    wrapper.instance().prevPage();
    expect(prevPage.calledOnce).toEqual(true);
  });

  it('calls searchDocuments when there is a query', () => {
    const wrapper = shallow(<HomePage {...props} />);
    wrapper.setState({ documents:[
      { title: 'A', content: 'A' },
      { title: 'B', content: 'A' },
      { title: 'C', content: 'A' },
      { title: 'D', content: 'A' },
      { title: 'E', content: 'A' },
      { title: 'F', content: 'A' },
      { title: 'G', content: 'A' }],
      pageData: {
        count: 3, pageNumber: 1, totalPages: 1, offset: 9, query:'andela'
      }
    });
    wrapper.instance().prevPage();
    expect(searchDocuments.called).toBe(true);
  });

  it('calls getDocuments when documents are greater than 9', () => {
    const wrapper = shallow(<HomePage {...props} />);
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
    expect(getDocuments.called).toBe(true);
  });
});
