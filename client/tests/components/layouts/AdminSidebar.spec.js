import React from 'react';
import expect from 'expect';
import { shallow } from 'enzyme';
import enzymify from 'expect-enzyme';
import AdminSidebar from '../../../components/layouts/AdminSidebar.jsx';

expect.extend(enzymify());

function setup(roleId = 1) {
  const props = {
    access: { user: { roleId } }
  };

  return shallow(<AdminSidebar {...props} />);
}

describe('AdminSidebar', () => {
  it('renders a div', () => {
    const wrapper = setup();
    expect(wrapper.find('div').length).toBe(1);
  });

  it('Material icons have a class of document-icons', () => {
    const wrapper = setup();
    expect(wrapper.find('i').first()).toHaveClass('document-icons');
  });

  it('renders 2 Links for superadmin', () => {
    const wrapper = setup();
    expect(wrapper.find('Link').length).toBe(2);
  });

  it('renders 1 Link for admin', () => {
    const wrapper = setup(2);
    expect(wrapper.find('Link').length).toBe(1);
  });
});
