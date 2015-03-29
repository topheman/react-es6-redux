'use strict';

import React from 'react';

import UsersSimpleProfileBox from './UsersSimpleProfileBox.jsx';

export default class UsersSimpleProfileList extends React.Component {
  constructor(props){
    super(props);
    this.state = {};
  }
  render() {
    var users = this.props.users;
    return (
      <table className="table">
        <thead>
          <tr>
            <td>Name</td>
          </tr>
        </thead>
        <tbody>
        {users.map(function(user){
          return <UsersSimpleProfileBox user={user}/>
        })}
        </tbody>
      </table>
    )
  }
}