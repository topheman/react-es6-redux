'use strict';

import React from 'react';

export default class UsersSimpleProfileBox extends React.Component {
  constructor(props){
    super(props);
    this.state = {}
  }
  render() {
    var user = this.props.user;
    return (
      <tr>
        <td><img src={user.$avatar_url} width="40"/></td>
        <td>{user.login}</td>
      </tr>
    )
  }
}