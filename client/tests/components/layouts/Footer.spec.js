import React from 'react';
import expect from 'expect';
import { shallow } from 'enzyme';
import enzymify from 'expect-enzyme';
import Footer from '../../../components/layouts/Footer.jsx';

expect.extend(enzymify());

function setup() {
  return shallow(<Footer />);
}

describe('Footer', () => {
  it('renders a footer', () => {
    const wrapper = setup();
    expect(wrapper.find('footer').length).toBe(1);
  });

  it('renders 2 divs', () => {
    const wrapper = setup();
    expect(wrapper.find('div').length).toBe(2);
  });

  it('renders the footer copyright div', () => {
    const wrapper = setup();
    expect(wrapper.find('div').first()).toHaveClass('footer-copyright');
  });

  it('renders footer with class of page-footer', () => {
    const wrapper = setup();
    expect(wrapper.find('footer')).toHaveClass('page-footer');
  });
});
