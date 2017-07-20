import expect from 'expect';
import sinon from 'sinon';
import React from 'react';
import { shallow, mount } from 'enzyme';
import { ViewDocumentPage } from
'../../../components/pages/ViewDocumentPage.jsx';

const getDocument = sinon.spy(() => Promise.resolve());
const deleteDocument = sinon.spy(() => Promise.resolve());

const props = {
  params: { id: 4 },
  document: { title: 'TIA', content: 'Andela', access: 'public', userId: 4 },
  access: { user: { id: 4 } },
  getDocument,
  deleteDocument
};


describe('ViewDocumentPage', () => {
  it('renders a div with class name of view-document', () => {
    const wrapper = shallow(<ViewDocumentPage {...props} />,
      { context: { router: { push: () => {} } } });
    expect(wrapper.find('.view-document').length).toBe(1);
  });
});
