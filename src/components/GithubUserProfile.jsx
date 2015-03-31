'use strict';

import React from 'react';

import github from '../services/github.js';

export default class GithubUserProfile extends React.Component {
  constructor(props){
    super(props);
    console.log(props);
    this.state = {};
    //directly passing data retrieved previously from the server for server-side rendering
    if(props.data){
      this.state.data = props.data;
    }
    //client-side fetching via xhr based on username
    else if(props.username){

    }
  }
  render(){
    return (
      <div>
        The username you're looking for : {this.props.params.username}
      </div>
    );
  }
}