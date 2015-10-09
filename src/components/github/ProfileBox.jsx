'use strict';

import React from 'react';

import { Router, Link } from 'react-router';

export default class ProfileBox extends React.Component {
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