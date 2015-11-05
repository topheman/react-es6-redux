'use strict';

import React from 'react';

import IntroBox from './github/IntroBox.jsx';
import SearchBox from './github/SearchBox.jsx';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as SearchUsersActions from '../actions/searchUsers.js';

/**
 * This component holds the state, the component bellow only use props
 */

@connect(
  (state) => ({state: state.searchUsers}),
  (dispatch) => bindActionCreators(SearchUsersActions, dispatch)
)
class Github extends React.Component {
  render(){
    //retrieve the actions now available in props thanks to connect and bindActionCreators, to pass it down to dumb components
    const { changeSearchUser, searchUsers } = this.props;
    //retrieving the state of the store passed via connect from the redux store - to pass it down to the dumb components
    let { state } = this.props;
    return (
      <div>
        <IntroBox/>
        <SearchBox changeSearchUser={changeSearchUser} searchUsers={searchUsers} {...state} />
      </div>
    );
  }
}

export default Github;