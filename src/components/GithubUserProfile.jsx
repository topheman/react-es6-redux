'use strict';

import React from 'react';

import github from '../services/github.js';
import Spinner from './common/Spinner.jsx';
import UserFullProfile from './githubUserProfile/UserFullProfile.jsx';

export default class GithubUserProfile extends React.Component {
  constructor(props){
    super(props);
    this.state = {};
    //directly passing data retrieved previously from the server for server-side rendering
    if(props.params.data){
      this.state.data = props.data;
    }
    //client-side fetching via xhr based on username
    else if(props.params.username){
      this.state.fetching = true;
      github.getUser(props.params.username)
        .then(function(result){
          this.setState({data: result.data});
          this.setState({fetching: false});
        }.bind(this))
        .catch(function(error){
          this.setState({
            data : {
              error : "An error occured, please try again."
            },
            fetching: false
          });
        }.bind(this));
    }
  }
  render(){
    var user = this.state.data;
    var fetching = this.state.fetching;
    return (
      <div>
        <Spinner fetching={fetching}/>
        <UserFullProfile user={user}/>
      </div>
    );
  }
}