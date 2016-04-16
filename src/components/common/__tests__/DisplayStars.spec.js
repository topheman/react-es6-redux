/* eslint-disable no-unused-expressions, react/prop-types */
import { expect } from 'chai';

import React from 'react';
import { shallow } from 'enzyme';
import DisplayStars from '../DisplayStars';

describe('components/common/DisplayStars', () => {
  describe('state/render', () => {
    it('should render the number passed via props.number if > 0', () => {
      const wrapper = shallow(<DisplayStars number={2} />);
      expect(wrapper.find('span').first().text()).to.equal('2 ');
    });
    it('should render nothing if props.number = 0', () => {
      const wrapper = shallow(<DisplayStars number={0} />);
      expect(wrapper.equals(null)).to.be.true;
    });
  });
});
