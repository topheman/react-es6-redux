'use strict';

import React from 'react';

export default class UserFullProfile extends React.Component {
  render(){
    var user = this.props.user;
    if (user && !user.error){
      return (
        <div>
          {user.login}
        </div>
      );
    }
    else if(user && user.error){
      return (
        <div>
          {user.error}
        </div>
      );
    }
    else{
      return(
        <div></div>
      );
    }
  }
}