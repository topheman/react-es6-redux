/* eslint-disable no-unused-expressions, react/prop-types */
import { expect } from 'chai';

import React from 'react';
import { shallow } from 'enzyme';
import Panel from '../Panel';

describe('components/common/Panel', () => {
  describe('state/render', () => {
    it('should render title', () => {
      const wrapper = shallow(<Panel title="Hello World"><div>Hie there</div></Panel>);
      expect(wrapper.contains(<h3 className="panel-title">Hello World</h3>)).to.be.true;
    });
    it('should render children', () => {
      const wrapper = shallow(<Panel title="Hello World"><div>Hie there</div></Panel>);
      expect(wrapper.contains(<div>Hie there</div>)).to.be.true;
    });
  });
});
