'use strict';

import React from 'react';

import github from '../services/github.js';
import Spinner from './common/Spinner.jsx';
import Profile from './githubUser/Profile.jsx';
import Repos from './githubUser/Repos.jsx';

export default class GithubUser extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      profile: {
        pristineLogin: props.params.username
      },
      repositories: {
        pristineLogin: props.params.username
      }
    };
    //server-side rendering based on passing data retrieved previously from the server
    if(props.params.data){
      this.state.profile = props.data.profile;
      this.state.repositories = props.data.repositories;
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
    var repositories = this.state.repositories;
    return (
      <div>
        <Profile profile={profile}/>
        <Repos repositories={repositories}/>
      </div>
    );
  }
}