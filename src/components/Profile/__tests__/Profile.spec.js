/* eslint-disable no-unused-expressions, react/prop-types */
import { expect } from 'chai';

import React from 'react';
import { shallow } from 'enzyme';
import Profile from '../Profile';
import Panel from '../../common/Panel';
import DisplayInfosPanel from '../../common/DisplayInfosPanel';

const mockProfile = {
  data: {
    html_url: 'https://github.com/topheman',
    login: 'topheman',
    avatar_url: 'https://avatars.githubusercontent.com/u/985982?v=3',
    name: 'Christophe Rosset',
    location: 'Paris',
    created_at: '2011-08-17T11:59:42Z',
    blog: 'http://labs.topheman.com/',
    followers: 37,
    following: 2,
    bio: 'JavaScript FTW'
  }
};

describe('components/Profile', () => {
  describe('state/render', () => {
    describe('profile fully hydrated', () => {
      const wrapper = shallow(<Profile profile={mockProfile} />);
      it('should render a Panel with props.profile.data.login as title', () => {
        expect(wrapper.find(Panel).props().title).to.be.equal('topheman');
      });
      it('should render a proper anchor with link & title', () => {
        const a = wrapper.find('a').first();
        expect(a.props().href).to.be.equal('https://github.com/topheman');
        expect(a.props().title).to.be.equal('Visit topheman profile on Github');
      });
      it('should render a proper image profile with correct avatar url (adapted)', () => {
        expect(wrapper.find('img').first().props().src).to.be.equal('https://avatars.githubusercontent.com/u/985982?v=3&s=130');
      });
    });
    describe('profile not fully hydrated', () => {
      it('should return a placeholder panel', () => {
        const wrapper = shallow(<Profile profile={{pristineLogin: 'topheman'}} />);
        expect(wrapper.equals(<DisplayInfosPanel infos={{pristineLogin: 'topheman'}} originalTitle="topheman" />)).to.be.true;
      });
    });
  });
});
