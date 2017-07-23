import expect from 'expect';
import sinon from 'sinon';
import React from 'react';
import { shallow, mount } from 'enzyme';
import { EditProfilePage } from
'../../../components/pages/EditProfilePage';

const updateUser = sinon.spy(() => Promise.resolve());
const spyHandleChange = sinon.spy(EditProfilePage.prototype, 'handleChange');

const props = {
  editprofileDetails: {},
  editprofileErrors: {},
  user: {
    id: 5,
    name: 'Ig Uk',
    email: 'income@gmail.com',
    username: '',
    roleId: '3'
  },
  pathname: '',
  access: { user: { id: 5 } },
  updateUser
};

describe('EditProfilePage', () => {
  it('renders the signup component', () => {
    const wrapper = shallow(<EditProfilePage {...props} />,
      { context: { router: { push: () => {} } } });
    expect(wrapper.find('SignupForm').length).toBe(1);
  });

  it('correctly passes in props', () => {
    const wrapper = shallow(<EditProfilePage {...props} />,
      { context: { router: { push: () => {} } } });
    expect(wrapper.find('SignupForm').prop('access'))
      .toEqual({ user: { id: 5 } });
  });

  it('can handle change in the edited form', () => {
    const wrapper = shallow(<EditProfilePage {...props} />,
      { context: { router: { push: () => {} } } });
    wrapper.instance().handleChange({
      preventDefault: () => {},
      target: { name: 'name', value: 'Ignatius' }
    });
    expect(spyHandleChange.calledOnce).toBe(true);
  });

  it('does not submit the form if a required field is missing or empty', () => {
    const wrapper = shallow(<EditProfilePage {...props} />,
      { context: { router: { push: () => {} } } });
    wrapper.instance().onSubmit({ preventDefault: () => {} });
    expect(updateUser.calledOnce).toBe(false);
  });

  it('can submit the edited form', () => {
    const wrapper = shallow(<EditProfilePage {...props} />,
      { context: { router: { push: () => {} } } });
    wrapper.setState({
      editprofileDetails: {
        name: 'Ig Uk', username: 'income', email: 'inc@in.com', roleId: 3
      }
    });
    wrapper.instance().onSubmit({ preventDefault: () => {} });
    expect(updateUser.calledOnce).toBe(true);
  });
});
