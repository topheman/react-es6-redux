'use strict';

import React from 'react';

import { Link } from 'react-router';

const ProfileBox = ({user}) => {
  var link = '/github/user/' + user.login;
  return (
    <Link to={link} className="list-group-item">
      <img src={user.$avatar_url} width="40"/> <strong>{user.login}</strong>
    </Link>
  )
}

export default ProfileBox;
