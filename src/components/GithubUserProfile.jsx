'use strict';

import React from 'react';

import github from '../services/github.js';
import Spinner from './common/Spinner.jsx';
import UserFullProfile from './githubUserProfile/UserFullProfile.jsx';

export default class GithubUserProfile extends React.Component {
  constructor(props){
    super(props);
    console.log(props);
    this.state = {};
    //directly passing data retrieved previously from the server for server-side rendering
    if(props.params.data){
      this.state.data = props.data;
    }
    //client-side fetching via xhr based on username
    else if(props.params.username){
      console.log('fetching');
      this.state.fetching = true;
      github.getUser(props.params.username)
        .end(function(err,res){
          if(err){
            this.setState({
              data : {
                error : "An error occured, please try again."
              }
            });
            this.setState({fetching: false});
            return;
          }
          this.setState({data: res.body});
          this.setState({fetching: false});
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