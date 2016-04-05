/* eslint-disable no-unused-expressions, react/prop-types */
import { expect } from 'chai';

import React from 'react';
import { shallow } from 'enzyme';
import ProfileBox from '../ProfileBox';
import { Link } from 'react-router';

const mockUser = {
  login: 'topheman',
  $avatar_url: 'https://avatars.githubusercontent.com/u/985982?v=3&s=130'
};

describe('components/ProfileBox', () => {
  describe('state/render', () => {
    const wrapper = shallow(<ProfileBox user={mockUser} />);
    it('should render link with correct props', () => {
      expect(wrapper.find(Link).prop('to')).to.be.equal('/github/user/topheman');
    });
    it('should render an img with src same as props.user.$avatar_url', () => {
      expect(wrapper.contains(<img src="https://avatars.githubusercontent.com/u/985982?v=3&s=130" width="40"/>)).to.be.true;
    });
    it('should render the user login', () => {
      expect(wrapper.contains(<strong>topheman</strong>)).to.be.true;
    });
  });
});
