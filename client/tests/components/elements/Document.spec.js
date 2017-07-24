import React from 'react';
import expect from 'expect';
import { shallow } from 'enzyme';
import Document from '../../../components/elements/Document';

function setup() {
  const props = {
    document: { title: 'Andela', content: 'TIA' },
    access: {},
    pathname: '',
    paramsId: ''
  };
  return shallow(<Document {...props} />);
}

describe('Document', () => {
  it('renders a div with className animated', () => {
    const wrapper = setup();
    expect(wrapper.find('.animated').length).toBe(1);
  });
});
