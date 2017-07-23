import expect from 'expect';
import sinon from 'sinon';
import React from 'react';
import { shallow, mount } from 'enzyme';
import { EditDocumentPage } from
'../../../components/pages/EditDocumentPage';

const getDocument = sinon.spy(() => Promise.resolve());
const updateDocument = sinon.spy(() => Promise.resolve());
const spyHandleChange = sinon.spy(EditDocumentPage.prototype, 'handleChange');
const spyEditorChange = sinon
  .spy(EditDocumentPage.prototype, 'handleEditorChange');

const props = {
  params: { id: 2 },
  document: { id: 2, title: 'TIA', content: 'Andela', access: 'public' },
  errors: {},
  actions: { updateDocument, getDocument }
};

describe('EditDocumentPage', () => {
  it('renders a text input component', () => {
    const wrapper = shallow(<EditDocumentPage {...props} />,
      { context: { router: { push: () => {} } } });
    expect(wrapper.find('TextInput').length).toBe(1);
  });

  it('renders a select input component', () => {
    const wrapper = shallow(<EditDocumentPage {...props} />,
      { context: { router: { push: () => {} } } });
    expect(wrapper.find('SelectInput').length).toBe(1);
  });

  it('renders a tiny mce component', () => {
    const wrapper = shallow(<EditDocumentPage {...props} />,
      { context: { router: { push: () => {} } } });
    expect(wrapper.find('TinyMCE').length).toBe(1);
  });

  it('updates the document in state if document id changes', () => {
    const spy = sinon.spy(EditDocumentPage.prototype,
    'componentWillReceiveProps');
    const wrapper = shallow(<EditDocumentPage {...props} />,
    { context: { router: { push: () => {} } } });
    wrapper.setProps({
      document: { id: 3, title: 'TGIF', content: 'Friday', access: 'public' }
    });
    expect(wrapper.state().document).toEqual(
      { id: 3, title: 'TGIF', content: 'Friday', access: 'public' }
    );
    expect(spy.calledOnce).toEqual(true);
  });

  it('correctly passes in props', () => {
    const wrapper = shallow(<EditDocumentPage {...props} />,
      { context: { router: { push: () => {} } } });
    expect(wrapper.find('TextInput').prop('id')).toEqual('document-title');
  });

  it('does not submit the form if a required field is missing or empty', () => {
    const wrapper = shallow(<EditDocumentPage {...props} />,
      { context: { router: { push: () => {} } } });
    wrapper.setState({
      document: { id: 2, title: '', content: 'Andela', access: 'public' }
    });
    wrapper.instance().onSubmit({ preventDefault: () => {} });
    expect(updateDocument.callCount).toBe(0);
    expect(wrapper.state().saving).toBe(false);
  });

  it('can submit the edited form', () => {
    const wrapper = shallow(<EditDocumentPage {...props} />,
      { context: { router: { push: () => {} } } });
    wrapper.instance().onSubmit({ preventDefault: () => {} });
    expect(updateDocument.callCount).toBe(1);
  });

  it('displays an error message if content field is empty', () => {
    const wrapper = shallow(<EditDocumentPage {...props} />,
      { context: { router: { push: () => {} } } });
    wrapper.setState({ errors: { content: 'Content Error' } });
    wrapper.instance().onSubmit({ preventDefault: () => {} });
    expect(wrapper.find('.red-text').length).toBe(1);
  });

  it('can handle change in the edited form', () => {
    const wrapper = shallow(<EditDocumentPage {...props} />,
      { context: { router: { push: () => {} } } });
    wrapper.instance().handleChange({
      preventDefault: () => {},
      target: { name: 'name', value: 'Ignatius' }
    });
    expect(spyHandleChange.calledOnce).toBe(true);
  });

  it('can handle change in the rich text editor', () => {
    const wrapper = shallow(<EditDocumentPage {...props} />,
      { context: { router: { push: () => {} } } });
    wrapper.instance().handleEditorChange({
      preventDefault: () => {},
      target: { getContent: () => {} }
    });
    expect(spyEditorChange.calledOnce).toBe(true);
  });
});
