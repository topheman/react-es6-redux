/* eslint-disable no-unused-expressions, react/prop-types */
import { expect } from 'chai';

import React from 'react';
import { shallow } from 'enzyme';
import Spinner from '../Spinner';

describe('components/common/Spinner', () => {
  describe('state/render', () => {
    it('should render empty div when props.fetching !== true', () => {
      const wrapper = shallow(<Spinner />);
      expect(wrapper.find('.bounce1').length).to.equal(0);
    });
    it('should render nested divs when props.fetching = true', () => {
      const wrapper = shallow(<Spinner fetching />);
      expect(wrapper.find('.bounce1').length).to.equal(1);
      expect(wrapper.find('.bounce2').length).to.equal(1);
      expect(wrapper.find('.bounce3').length).to.equal(1);
    });
  });
});
