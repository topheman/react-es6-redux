'use strict';

import React from 'react';

import UsersSimpleProfileBox from './UsersSimpleProfileBox.jsx';

export default class UsersSimpleProfileList extends React.Component {
  constructor(props){
    super(props);
    this.state = {};
  }
  render() {
    var results = this.props.results;
    if (results === null) {
      return (
        <div></div>
      )
    }
    else if(results.error){
      return (
        <div>
          {results.error}
        </div>
      )
    }
    else if(results.total_count === 0){
      return (
        <div>
          No results.
        </div>
      )
    }
    else {
      return (
        <div className="panel panel-default">
          <div className="panel-heading">Total result : {results.total_count} / showing : {results.items.length}</div>
          <div className="list-group">
            {results.items.map(function (user) {
              user.$avatar_url = user.avatar_url+"&s=40";
              return <UsersSimpleProfileBox key={user.id} user={user}/>
            })}
          </div>
        </div>
      )
    }
  }
}