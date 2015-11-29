'use strict';

import React from 'react';

import IntroBox from '../../components/IntroBox/IntroBox.jsx';
import SearchBox from '../../components/SearchBox/SearchBox.jsx';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { changeUsername, findUsers } from '../../redux/modules/multipleUsers.js';//import action creators

/**
 * This component holds the state, the component bellow only use props
 */

@connect(
  (state) => ({multipleUsers: state.multipleUsers}),
  (dispatch) => bindActionCreators({ changeUsername, findUsers }, dispatch)
)
class Github extends React.Component {
  render(){
    //retrieve the actions now available in props thanks to connect and bindActionCreators, to pass it down to dumb components
    const { changeUsername, findUsers } = this.props;
    //retrieving the state of the store passed via connect from the redux store - to pass it down to the dumb components
    const { multipleUsers } = this.props;
    return (
      <div>
        <IntroBox/>
        <SearchBox changeUsername={changeUsername} findUsers={findUsers} {...multipleUsers} />
      </div>
    );
  }
}

export default Github;
