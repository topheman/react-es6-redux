/* eslint-disable no-unused-expressions, react/prop-types */
import { expect } from 'chai';

import React from 'react';
import { shallow } from 'enzyme';
import Repos from '../Repos';
import DisplayInfosPanel from '../../common/DisplayInfosPanel';
import DisplayStars from '../../common/DisplayStars';

function noop() {}

describe('components/ProfileBox', () => {
  describe('state/render', () => {
    it('should render a placeholder if props.repositories.data not hydrated', () => {
      const mockRepositories = { fetching: false, pristineLogin: 'topheman' };
      const wrapper = shallow(<Repos repositories={mockRepositories} reposGotoPage={noop} />);
      expect(wrapper.equals(<DisplayInfosPanel infos={mockRepositories} originalTitle="topheman's repositories"/>)).to.be.true;
    });
    describe('check render for list of repositories', () => {
      const mockRepositories = {
        fetching: false,
        infos: {},
        pristineLogin: 'topheman',
        data: [
          { html_url: 'https://github.com/topheman/react-es6-redux', name: 'react-es6-redux', stargazers_count: 57, full_name: 'topheman/react-es6-redux' },
          { html_url: 'https://github.com/topheman/webpack-babel-starter', name: 'webpack-babel-starter', stargazers_count: 39, full_name: 'topheman/webpack-babel-starter' },
          { html_url: 'https://github.com/topheman/rxjs-experiments', name: 'rxjs-experiments', stargazers_count: 19, full_name: 'topheman/rxjs-experiments' }
        ]
      };
      const wrapper = shallow(<Repos repositories={mockRepositories} reposGotoPage={noop} />);
      it('should render the correct amount of links to repos', () => {
        expect(wrapper.find('a').length).to.equal(3);
      });
      it('should render links properly', () => {
        const anchor = wrapper.find('a').at(1);
        expect(anchor.prop('href')).to.equal('https://github.com/topheman/webpack-babel-starter');
        expect(anchor.prop('title')).to.equal('topheman/webpack-babel-starter');
      });
      it('should render stargazer properly', () => {
        const displayStars = wrapper.find(DisplayStars).at(1);
        expect(displayStars.prop('number')).to.equal(39);
      });
    });
    describe('check paginators', () => {

    });
  });
});
