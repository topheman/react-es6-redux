/* eslint-disable no-unused-expressions, react/prop-types */
import { expect } from 'chai';

import React from 'react';
import { shallow } from 'enzyme';
import ProfileList from '../ProfileList';
import ProfileBox from '../../ProfileBox/ProfileBox';

describe('components/ProfileList', () => {
  describe('state/render', () => {
    describe('case props.results not hydrated with data', () => {
      it('should render default message if props.results = null', () => {
        const wrapper = shallow(<ProfileList results={null} />);
        expect(wrapper.type()).to.be.equal('p');
      });
      it('should render the error if props.results.error is set', () => {
        const wrapper = shallow(<ProfileList results={{error: 'Something went wrong'}} />);
        expect(wrapper.equals(<div>Something went wrong</div>)).to.be.true;
      });
      it('should show "No results" if props.results.total_count = 0', () => {
        const wrapper = shallow(<ProfileList results={{total_count: 0}} />);
        expect(wrapper.equals(<div>No results.</div>)).to.be.true;
      });
    });
    describe('case props.results hydrated with data', () => {
      it('header should show "Total result" in case props.results.total_count = 1', () => {
        const wrapper = shallow(<ProfileList results={{total_count: 1, items: [{$avatar_url: 'someurl', id: 42, login: 'foo'}] }} />);
        expect(wrapper.find('.panel-heading').text()).to.equal('Total result : 1 / showing : 1');
      });
      it('header should show "Total results" in case props.results.total_count > 1', () => {
        const wrapper = shallow(<ProfileList results={{total_count: 2, items: [{$avatar_url: 'someurl', id: 42, login: 'foo'}, {$avatar_url: 'someurl', id: 43, login: 'bar'}] }} />);
        expect(wrapper.find('.panel-heading').text()).to.equal('Total results : 2 / showing : 2');
      });
      it('should render correctly the ProfileBox in the list', () => {
        const wrapper = shallow(<ProfileList results={{total_count: 1, items: [{$avatar_url: 'someurl', id: 42, login: 'foo'}] }} />);
        expect(wrapper.find(ProfileBox).first().prop('user').id).to.equal(42);
      });
      it('should render correctly multiple ProfileBox in the list', () => {
        const wrapper = shallow(<ProfileList results={{total_count: 1, items: [{$avatar_url: 'someurl', id: 42, login: 'foo'}, {$avatar_url: 'someurl', id: 43, login: 'bar'}] }} />);
        expect(wrapper.find(ProfileBox).length).to.equal(2);
      });
    });
  });
});
