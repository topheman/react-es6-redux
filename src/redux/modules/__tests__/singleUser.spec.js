/* eslint-disable no-unused-expressions, react/prop-types */
import { expect } from 'chai';

import { default as reducer, initUsername, getProfile, getRepositories } from '../singleUser';

const INIT = 'singleUser/INIT';

const FETCH_PROFILE = 'singleUser/FETCH_PROFILE';
const FETCH_PROFILE_SUCCESS = 'singleUser/FETCH_PROFILE_SUCCESS';
const FETCH_PROFILE_ERROR = 'singleUser/FETCH_PROFILE_ERROR';

const FETCH_REPOSITORIES = 'singleUser/FETCH_REPOSITORIES';
const FETCH_REPOSITORIES_SUCCESS = 'singleUser/FETCH_REPOSITORIES_SUCCESS';
const FETCH_REPOSITORIES_ERROR = 'singleUser/FETCH_REPOSITORIES_ERROR';

// this state will be reused accross the tests - it represent the state after INIT was dispatched
const initialState = {
  profile: {
    pristineLogin: '',
    data: null,
    fetching: false,
    error: null
  },
  repositories: {
    pristineLogin: '',
    data: null,
    fetching: false,
    infos: null,
    error: null
  }
};

describe('redux/modules/singleUser', () => {
  describe('reducer', () => {
    it('should return default state', () => {
      expect(reducer()).to.eql(initialState);
    });
    it('should init pristineLogin at INIT', () => {
      expect(reducer(undefined, {type: INIT, username: 'topheman'})).to.eql({
        profile: {
          pristineLogin: 'topheman',
          data: null,
          fetching: false,
          error: null
        },
        repositories: {
          pristineLogin: 'topheman',
          data: null,
          fetching: false,
          infos: null,
          error: null
        }
      });
    });
    it('should tag profile as fetching on FETCH_PROFILE', () => {
      const state = {
        profile: {
          ...initialState.profile,
          pristineLogin: 'topheman'
        },
        repositories: {
          ...initialState.repositories,
          pristineLogin: 'topheman'
        }
      };
      expect(reducer(state, {type: FETCH_PROFILE})).to.eql({
        profile: {
          pristineLogin: 'topheman',
          data: null,
          fetching: true,
          error: null
        },
        repositories: {
          pristineLogin: 'topheman',
          data: null,
          fetching: false,
          infos: null,
          error: null
        }
      });
    });
    it('should tag profile as fetched & hydrate data on FETCH_PROFILE_SUCCESS', () => {
      const state = {
        profile: {
          ...initialState.profile,
          fetching: true,
          pristineLogin: 'topheman'
        },
        repositories: {
          ...initialState.repositories,
          pristineLogin: 'topheman'
        }
      };
      expect(reducer(state, {type: FETCH_PROFILE_SUCCESS, result: { data: 'Hello World' }})).to.eql({
        profile: {
          pristineLogin: 'topheman',
          data: 'Hello World',
          fetching: false,
          error: null
        },
        repositories: {
          pristineLogin: 'topheman',
          data: null,
          fetching: false,
          infos: null,
          error: null
        }
      });
    });
    it('should tag profile as fetched & hydrate error on FETCH_PROFILE_ERROR', () => {
      const state = {
        profile: {
          ...initialState.profile,
          fetching: true,
          pristineLogin: 'topheman'
        },
        repositories: {
          ...initialState.repositories,
          pristineLogin: 'topheman'
        }
      };
      expect(reducer(state, {type: FETCH_PROFILE_ERROR, error: { humanMessage: 'Something went wrong' }})).to.eql({
        profile: {
          pristineLogin: 'topheman',
          data: null,
          fetching: false,
          error: 'Something went wrong'
        },
        repositories: {
          pristineLogin: 'topheman',
          data: null,
          fetching: false,
          infos: null,
          error: null
        }
      });
    });
  });
  describe('action creators', () => {
    it('initUsername(username) should return proper action', () => {
      expect(initUsername('topheman')).to.eql({
        type: INIT,
        username: 'topheman'
      });
    });
    it('getProfile(username) should return proper action', () => {
      const action = getProfile('topheman');
      expect(action.types).to.eql([FETCH_PROFILE, FETCH_PROFILE_SUCCESS, FETCH_PROFILE_ERROR]);
      expect(action.promise).to.be.a('function');
    });
    it('getRepositories(username) should return proper action', () => {
      const action = getRepositories('topheman');
      expect(action.types).to.eql([FETCH_REPOSITORIES, FETCH_REPOSITORIES_SUCCESS, FETCH_REPOSITORIES_ERROR]);
      expect(action.promise).to.be.a('function');
    });
  });
});
