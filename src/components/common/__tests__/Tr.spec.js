/* eslint-disable no-unused-expressions, react/prop-types */
import { expect } from 'chai';

import React from 'react';
import { shallow } from 'enzyme';
import Tr from '../Tr';

describe('components/common/Tr', () => {
  describe('state/render', () => {
    it('should render 2 columns by default', () => {
      const wrapper = shallow(<Tr label="Hello" value="World" />);
      expect(wrapper.find('td').length).to.equal(2);
      expect(wrapper.contains(<td>Hello</td>)).to.be.true;
      expect(wrapper.contains(<td>World</td>)).to.be.true;
    });
    it('should render in 1 column if props.display = colspan', () => {
      const wrapper = shallow(<Tr value="Hello World" display="colspan" />);
      expect(wrapper.find('td').length).to.equal(1);
      expect(wrapper.contains(<td colSpan="2">Hello World</td>)).to.be.true;
    });
    it('should render value as a link if props.type = link', () => {
      const wrapper = shallow(<Tr value="http://labs.topheman.com" label="Website" type="link" />);
      expect(wrapper.contains(<a href="http://labs.topheman.com">http://labs.topheman.com</a>)).to.be.true;
    });
    it('should render value as date (without hours/min/sec) if value is instance of a Date', () => {
      const value = new Date('2014-04-24');
      const expected = 'Thu Apr 24 2014';
      const wrapper = shallow(<Tr value={value} label="Date" />);
      expect(wrapper.contains(<td>{expected}</td>)).to.be.true;
    });
    it('should render no nested td if no props.value passed', () => {
      const wrapper = shallow(<Tr />);
      expect(wrapper.find('td').length).to.equal(0);
    });
  });
});
