import React from 'react';
import expect from 'expect';
import { shallow } from 'enzyme';
import enzymify from 'expect-enzyme';
import Pagination from '../../../components/elements/Pagination.jsx';

expect.extend(enzymify());

function setup(pageSize = 9, pageNumber = 1) {
  const props = {
    documents: [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
    pageData: { pageNumber,
      totalPages: 2,
      pageSize,
      count: 12 },
    nextPage: () => {},
    prevPage: () => {}
  };

  return shallow(<Pagination {...props} />);
}

describe('Pagination', () => {
  it('renders 2 div elements', () => {
    const wrapper = setup();
    expect(wrapper.find('div').length).toBe(2);
  });

  it('correctly displays figures passed in props', () => {
    const wrapper = setup();
    expect(wrapper.find('#paginationText').text()).toBe('Page 1 of 2');
  });

  it('correctly displays figures passed as pageData', () => {
    const wrapper = setup();
    expect(wrapper.find('.center').text()).toBe('Showing 9 of 12 results');
  });

  it('renders buttons for next and previous pages', () => {
    const wrapper = setup();
    expect(wrapper.find('.material-icons').length).toEqual(2);
    expect(wrapper.find('.material-icons')
      .first().text()).toEqual('chevron_left');
    expect(wrapper.find('.material-icons')
      .last().text()).toEqual('chevron_right');
  });

  it('renders `No documents found` when no document is available', () => {
    const wrapper = setup(0);
    expect(wrapper.find('p').text()).toBe('No documents found');
  });

  it('renders a disabled previous button in page 1', () => {
    const wrapper = setup();
    expect(wrapper.find('li').first()).toHaveClass('disabled');
  });

  it('renders a disabled previous button in page 1', () => {
    const wrapper = setup(9, 2);
    expect(wrapper.find('li').first()).toHaveClass('waves-effect');
  });
});
