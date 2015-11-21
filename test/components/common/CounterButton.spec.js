'use strict';

import expect from 'expect';
import TestUtils from 'react-addons-test-utils';
import React from 'react';

import { CounterButton } from '../../../src/components/common/CounterButton.jsx';

function setup({counter=0}={}){
  let props = {
    increment: expect.createSpy(),
    counter:counter
  }
  let renderer = TestUtils.createRenderer();
  renderer.render(<CounterButton {...props}/>);
  let output = renderer.getRenderOutput();

  return {
    props,
    output,
    renderer
  }
}

describe('components/common/CounterButton',() => {
  describe('render',() => {
    it('should render correctly the button and its children (default state)',() => {
      const { output } = setup();

      //checking the button tag
      expect(output.type).toBe('button');
      expect(output.props.type).toBe('button');
      expect(output.props.className).toBe('btn btn-primary');

      //checking the children
      let [ text, span ] = output.props.children;

      expect(text).toBe('Click to increment ');
      expect(span.type).toBe('span');
      expect(span.props.className).toBe('badge');
      expect(span.props.children).toBe(0);
    });
    it('should render the badge according to props',() => {
      const { output } = setup({counter:2});
      let [ text, span ] = output.props.children;
      expect(span.props.children).toBe(2);
    });
  })
  describe('behaviour',() => {
    it('click should call increment', () => {
      const { output, props } = setup();
      output.props.onClick({});
      expect(props.increment).toHaveBeenCalled();
    });
  })
})