import expect from 'expect';
import TestUtils from 'react-addons-test-utils';
import React from 'react';

import { CounterButton } from '../../../../src/components/CounterButton/CounterButton.js';

function setup({counter = 0} = {}) {
  const props = {
    increment: expect.createSpy(),
    counter: counter
  };
  const renderer = TestUtils.createRenderer();
  renderer.render(<CounterButton {...props}/>);
  const output = renderer.getRenderOutput();

  return {
    props,
    output,
    renderer
  };
}

describe('components/CounterButton/CounterButton.js', () => {
  describe('render', () => {
    it('should render correctly the button and its children (default state)', () => {
      const { output } = setup();

      // checking the button tag
      expect(output.type).toBe('button');
      expect(output.props.type).toBe('button');
      expect(output.props.className).toBe('btn btn-primary');

      // checking the children
      const [ text, span ] = output.props.children;

      expect(text).toBe('Click to increment ');
      expect(span.type).toBe('span');
      expect(span.props.className).toBe('badge');
      expect(span.props.children).toBe(0);
    });
    it('should render the badge according to props', () => {
      const { output } = setup({counter: 2});
      const [ , span ] = output.props.children;
      expect(span.props.children).toBe(2);
    });
  });
  describe('behaviour', () => {
    it('click should call increment', () => {
      const { output, props } = setup();
      output.props.onClick({});
      expect(props.increment).toHaveBeenCalled();
    });
  });
});
