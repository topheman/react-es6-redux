'use strict';

import React from 'react';

import github from '../services/github.js';
import Spinner from './common/Spinner.jsx';
import UserFullProfile from './githubUserProfile/UserFullProfile.jsx';

export default class GithubUserProfile extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      profile: {
        pristineLogin: props.params.username
      },
      repos: {}
    };
    //server-side rendering based on passing data retrieved previously from the server
    if(props.params.data){
      this.state.profile = props.data.profile;
      this.state.repos = props.data.repos;
    }
    //client-side fetching via xhr
    else if(props.params.username){
      this.state.profile.fetching = true;
      //client-side fetching of the profile via xhr based on username
      github.getUser(props.params.username)
        .then(function(result){
          this.setState({
            profile: {
              data: result.data,
              fetching: false
            }
          });
        }.bind(this))
        .catch(function(error){
          this.setState({
            profile: {
              error : error.humanMessage,
              fetching: false
            }
          });
        }.bind(this));
    }
  }
  render(){
    var profile = this.state.profile;
    return (
      <div>
        <UserFullProfile profile={profile}/>
      </div>
    );
  }
}