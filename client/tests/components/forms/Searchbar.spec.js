import expect from 'expect';
import sinon from 'sinon';
import React from 'react';
import { mount } from 'enzyme';
import { Searchbar } from '../../../components/forms/Searchbar';

const spyHandleChange = sinon.spy(Searchbar.prototype, 'handleChange');
const spySearch = sinon.spy(Searchbar.prototype, 'submitSearch');
const searchUsers = sinon.spy(() => Promise.resolve());
const searchDocuments = sinon.spy(() => Promise.resolve());

const state = {
  search : ''
};

const props = {
  searchUsers,
  searchDocuments
};

describe('Searchbar', () => {
  it('renders a form', () => {
    const wrapper = mount(<Searchbar {...state} />,
      { context: { router: { push: () => {} } } });
    expect(wrapper.find('form').length).toBe(1);
  });

  it('can handle change in the search form', () => {
    const wrapper = mount(<Searchbar {...state} />);
    wrapper.instance().handleChange({
      target: { value: 'andela' }
    });
    expect(spyHandleChange.calledOnce).toBe(true);
  });

  it('can submit the form to search documents', () => {
    const wrapper = mount(<Searchbar {...state} {...props} />);
    wrapper.setState({
      search: 'andela'
    });
    wrapper.instance().submitSearch({ preventDefault: () => {} });
    expect(searchDocuments.callCount).toBe(1);
  });
});
