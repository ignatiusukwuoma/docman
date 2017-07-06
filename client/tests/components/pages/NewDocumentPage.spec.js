import expect from 'expect';
import sinon from 'sinon';
import React from 'react';
import { shallow, mount } from 'enzyme';
import { NewDocumentPage } from
'../../../components/pages/NewDocumentPage.jsx';

const createDocument = sinon.spy(() => Promise.resolve());
const spyHandleChange = sinon.spy(NewDocumentPage.prototype, 'handleChange');
const spyEditorChange = sinon
  .spy(NewDocumentPage.prototype, 'handleEditorChange');

const props = {
  createDocument
};

const state = {
  document: {},
  errors: {},
  saving: false
};

describe('NewDocumentPage', () => {
  it('renders a text input component', () => {
    const wrapper = shallow(<NewDocumentPage {...props} {...state} />,
      { context: { router: { push: () => {} } } });
    expect(wrapper.find('TextInput').length).toBe(1);
  });

  it('renders a select input component', () => {
    const wrapper = shallow(<NewDocumentPage {...props} {...state} />,
      { context: { router: { push: () => {} } } });
    expect(wrapper.find('SelectInput').length).toBe(1);
  });

  it('renders a tiny mce component', () => {
    const wrapper = shallow(<NewDocumentPage {...props} {...state} />,
      { context: { router: { push: () => {} } } });
    expect(wrapper.find('TinyMCE').length).toBe(1);
  });

  it('correctly passes in props', () => {
    const wrapper = shallow(<NewDocumentPage {...props} {...state} />,
      { context: { router: { push: () => {} } } });
    expect(wrapper.find('TextInput').prop('id')).toEqual('document-title');
  });

  it('does not submit the form if a required field is missing or empty', () => {
    const wrapper = shallow(<NewDocumentPage {...props} {...state} />,
      { context: { router: { push: () => {} } } });
    wrapper.setState({
      document: { title: '', content: 'Andela', access: 'public' }
    });
    wrapper.instance().onSubmit({ preventDefault: () => {} });
    expect(createDocument.callCount).toBe(0);
    expect(wrapper.state().saving).toBe(false);
  });

  it('can submit the form', () => {
    const wrapper = shallow(<NewDocumentPage {...props} {...state} />,
      { context: { router: { push: () => {} } } });
    wrapper.setState({
      document: { title: 'TIA', content: 'Andela', access: 'public' }
    });
    wrapper.instance().onSubmit({ preventDefault: () => {} });
    expect(createDocument.callCount).toBe(1);
  });

  it('displays an error message if content field is empty', () => {
    const wrapper = shallow(<NewDocumentPage {...props} {...state} />,
      { context: { router: { push: () => {} } } });
    wrapper.setState({ errors: { content: 'Content Error' } });
    wrapper.instance().onSubmit({ preventDefault: () => {} });
    expect(wrapper.find('.red-text').length).toBe(1);
  });

  it('can handle change in the form', () => {
    const wrapper = shallow(<NewDocumentPage {...props} {...state} />,
      { context: { router: { push: () => {} } } });
    wrapper.instance().handleChange({
      preventDefault: () => {},
      target: { name: 'name', value: 'Ignatius' }
    });
    expect(spyHandleChange.calledOnce).toBe(true);
  });

  it('can handle change in the rich text editor', () => {
    const wrapper = shallow(<NewDocumentPage {...props} {...state} />,
      { context: { router: { push: () => {} } } });
    wrapper.instance().handleEditorChange({
      preventDefault: () => {},
      target: { getContent: () => {} }
    });
    expect(spyEditorChange.calledOnce).toBe(true);
  });
});
