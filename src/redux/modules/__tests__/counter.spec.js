/* eslint-disable no-unused-expressions, react/prop-types */
import { expect } from 'chai';

import { default as reducer, increment } from '../counter';

const INCREMENT = 'counter/INCREMENT';

describe('redux/modules/counter', () => {
  describe('reducer', () => {
    it('should return default state = 0', () => {
      expect(reducer()).to.equal(0);
    });
    it('should return increment state on INCREMENT action', () => {
      expect(reducer(2, {type: INCREMENT})).to.equal(3);
    });
  });
  describe('action creators', () => {
    it('increment() should return proper action', () => {
      expect(increment()).to.eql({type: INCREMENT});
    });
  });
});
