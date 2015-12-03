import React from 'react';

import IntroBox from '../../components/IntroBox/IntroBox.js';
import SearchBox from '../../components/SearchBox/SearchBox.js';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { changeUsername, findUsers } from '../../redux/modules/multipleUsers.js';// import action creators

const Github = ({ multipleUsers, changeUsername: propChangeUsername, findUsers: propFindUsers }) => {
  return (
    <div>
      <IntroBox/>
      <SearchBox changeUsername={propChangeUsername} findUsers={propFindUsers} {...multipleUsers} />
    </div>
  );
};

Github.propTypes = {
  multipleUsers: React.PropTypes.object.isRequired,
  changeUsername: React.PropTypes.func.isRequired,
  findUsers: React.PropTypes.func.isRequired
};

export default connect(
  (state) => ({multipleUsers: state.multipleUsers}),
  (dispatch) => bindActionCreators({ changeUsername, findUsers }, dispatch)
)(Github);
