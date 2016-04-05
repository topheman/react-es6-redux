import React from 'react';

import { Link } from 'react-router';

const ProfileBox = ({user}) => {
  const link = '/github/user/' + user.login;
  return (
    <Link to={link} className="list-group-item">
      <img src={user.$avatar_url} width="40"/> <strong>{user.login}</strong>
    </Link>
  );
};

ProfileBox.propTypes = {
  user: React.PropTypes.shape({
    login: React.PropTypes.string.isRequired,
    $avatar_url: React.PropTypes.string.isRequired
  })
};

export default ProfileBox;
