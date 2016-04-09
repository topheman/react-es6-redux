/* eslint-disable no-unused-expressions, react/prop-types */
import { expect } from 'chai';

import React from 'react';
import { shallow } from 'enzyme';
import DisplayInfosPanel from '../DisplayInfosPanel';
import Spinner from '../Spinner';
import Panel from '../Panel';

describe('components/common/DisplayInfosPanel', () => {
  describe('state/render', () => {
    it('should render a spinner at fetching=true when props.infos.fetching = true', () => {
      const wrapper = shallow(<DisplayInfosPanel infos={{fetching: true}} originalTitle={""} />);
      expect(wrapper.find(Spinner).props().fetching).to.be.true;
    });
    it('should render a spinner at fetching=false when props.infos.fetching = false', () => {
      const wrapper = shallow(<DisplayInfosPanel infos={{fetching: false}} originalTitle={""} />);
      expect(wrapper.find(Spinner).props().fetching).to.be.false;
    });
    it('should render a panel with a title=props.originalTitle when props.infos.fetching = true', () => {
      const wrapper = shallow(<DisplayInfosPanel infos={{fetching: true}} originalTitle={"Hello World"} />);
      expect(wrapper.find(Panel).props().title).to.equal('Hello World');
    });
    it('should render the error passed in props.infos.error', () => {
      const wrapper = shallow(<DisplayInfosPanel infos={{error: 'Something went wrong'}} />);
      expect(wrapper.contains(<div className="alert alert-danger col-xs-offset-1 col-xs-10" role="alert">Something went wrong</div>)).to.be.true;
    });
  });
});
