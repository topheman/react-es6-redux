'use strict';

import React from 'react';

import github from '../services/github.js';
import Spinner from './common/Spinner.jsx';
import Profile from './githubUser/Profile.jsx';
import Repos from './githubUser/Repos.jsx';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as SingleUserActions from '../actions/singleUser.js';

@connect(
  (state) => ({state: state.singleUser}),
  (dispatch) => bindActionCreators(SingleUserActions, dispatch)
)
class GithubUser extends React.Component {
  constructor(props){
    super(props);

    //init context bindings - due to diff between React.createClass and ES6 class
    this.reposGotoPage = this.reposGotoPage.bind(this);
    this.componentWillMount = this.componentWillMount.bind(this);
  }
  componentWillMount(){
    this.props.initUserProfile(this.props.params.username);
    this.props.getUser(this.props.params.username);
    this.props.getUserRepos(this.props.params.username);
  }
  reposGotoPage(pageNum){
    this.props.getUserRepos(this.props.params.username,{
      page: pageNum
    });
  }
  render(){
    var profile = this.props.state.profile;
    var repositories = this.props.state.repositories;
    return (
      <div>
        <Profile profile={profile}/>
        <Repos repositories={repositories} reposGotoPage={this.reposGotoPage}/>
      </div>
    );
  }
}

export default GithubUser;