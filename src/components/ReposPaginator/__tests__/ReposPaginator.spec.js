/* eslint-disable no-unused-expressions, react/prop-types */
import { expect } from 'chai';

import React from 'react';
import { shallow } from 'enzyme';
import ReposPaginator from '../ReposPaginator';

function noop() {}
const syntheticEventData = {
  preventDefault: function preventDefault() {}
};

describe('components/ReposPaginator', () => {
  describe('state/render', () => {
    it('should render empty p if props.infos.totalPages < 1', () => {
      const wrapper = shallow(<ReposPaginator infos={{}} reposGotoPage={noop} fetching={false} />);
      expect(wrapper.equals(<p></p>)).to.be.true;
    });
    it('should render link to first page if props.infos.page > 1', () => {
      const wrapper = shallow(<ReposPaginator infos={{totalPages: 10, page: 2}} reposGotoPage={noop} fetching={false} />);
      const li = wrapper.find('li').first();
      expect(li.prop('className')).to.be.equal('previous');
      expect(li.find('a').prop('title')).to.be.equal('First page');
    });
    it('should render link to previous page if props.infos.page > 2', () => {
      const wrapper = shallow(<ReposPaginator infos={{totalPages: 10, page: 3}} reposGotoPage={noop} fetching={false} />);
      const li = wrapper.find('li').at(1);
      expect(li.prop('className')).to.be.equal('previous');
      expect(li.find('a').prop('title')).to.be.equal('Previous page');
    });
    it('should render link to next page if props.infos.page<props.infos.totalPages - 1', () => {
      const wrapper = shallow(<ReposPaginator infos={{totalPages: 10, page: 7}} reposGotoPage={noop} fetching={false} />);
      const li = wrapper.find('li').at(3);
      expect(li.prop('className')).to.be.equal('next');
      expect(li.find('a').prop('title')).to.be.equal('Next page');
    });
    it('should render link to last page if props.infos.page<=props.infos.totalPages - 1', () => {
      const wrapper = shallow(<ReposPaginator infos={{totalPages: 10, page: 7}} reposGotoPage={noop} fetching={false} />);
      const li = wrapper.find('li').at(2);
      expect(li.prop('className')).to.be.equal('next');
      expect(li.find('a').prop('title')).to.be.equal('Last page');
    });
  });
  describe('state/behaviour', () => {
    it('click on "first page" should call props.reposGotoPage(1)', () => {
      const spy = sinon.spy();
      const wrapper = shallow(<ReposPaginator infos={{totalPages: 10, page: 5}} reposGotoPage={spy} fetching={false} />);
      const first = wrapper.find('li').at(0).find('a');
      first.simulate('click', syntheticEventData);
      expect(spy.calledOnce).to.be.true;
      expect(spy.calledWith(1)).to.be.true;
    });
    it('click on "previous page" should call props.reposGotoPage(props.infos.page - 1)', () => {
      const spy = sinon.spy();
      const wrapper = shallow(<ReposPaginator infos={{totalPages: 10, page: 5}} reposGotoPage={spy} fetching={false} />);
      const first = wrapper.find('li').at(1).find('a');
      first.simulate('click', syntheticEventData);
      expect(spy.calledOnce).to.be.true;
      expect(spy.calledWith(4)).to.be.true;
    });
    it('click on "next page" should call props.reposGotoPage(props.infos.page + 1)', () => {
      const spy = sinon.spy();
      const wrapper = shallow(<ReposPaginator infos={{totalPages: 10, page: 5}} reposGotoPage={spy} fetching={false} />);
      const first = wrapper.find('li').at(3).find('a');
      first.simulate('click', syntheticEventData);
      expect(spy.calledOnce).to.be.true;
      expect(spy.calledWith(6)).to.be.true;
    });
    it('click on "last page" should call props.reposGotoPage(props.infos.totalPages)', () => {
      const spy = sinon.spy();
      const wrapper = shallow(<ReposPaginator infos={{totalPages: 10, page: 5}} reposGotoPage={spy} fetching={false} />);
      const first = wrapper.find('li').at(2).find('a');
      first.simulate('click', syntheticEventData);
      expect(spy.calledOnce).to.be.true;
      expect(spy.calledWith(10)).to.be.true;
    });
  });
});
