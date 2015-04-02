'use strict';

import React from 'react';

import Router from 'react-router';

var Link = Router.Link;

export default class ProfileBox extends React.Component {
  constructor(props){
    super(props);
    this.state = {}
  }
  render() {
    var user = this.props.user;
    var link = '/github/user/' + user.login;
    return (
      <Link to={link} className="list-group-item">
        <img src={user.$avatar_url} width="40"/> <strong>{user.login}</strong>
      </Link>
    )
  }
}