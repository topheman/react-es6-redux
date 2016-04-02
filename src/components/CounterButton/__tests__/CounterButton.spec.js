/* eslint-disable no-unused-expressions, react/prop-types */
import { expect } from 'chai';

import React from 'react';
import { shallow } from 'enzyme';
import { CounterButton } from '../CounterButton';

function noop() {}

describe('components/CounterButton', () => {
  describe('state/render', () => {
    it('should render the badge from props', () => {
      const wrapper = shallow(<CounterButton increment={noop} counter={4} />);
      expect(wrapper.find('span').text()).to.be.equal('4');
    });
  });
  describe('state/behaviour', () => {
    it('should call props.increment onClick on button', () => {
      const onButtonClick = sinon.spy();
      const wrapper = shallow(<CounterButton increment={onButtonClick} counter={0} />);
      wrapper.find('button').simulate('click');
      expect(onButtonClick.calledOnce).to.be.true;
    });
  });
});
