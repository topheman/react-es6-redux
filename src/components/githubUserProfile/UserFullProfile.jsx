'use strict';

import React from 'react';

import TrInfo from './TrInfo.jsx';

//@todo cache the last 10 profiles accessed
//@todo extract the panel to an other component to reuse it for followers

export default class UserFullProfile extends React.Component {
  render(){
    var user = this.props.user;
    if (user && !user.error){
      user.$githubProfileHref = user.html_url;
      user.$githubProfileHrefTitle = "Visit " + user.login + " profile on Github";
      user.$avatar_url = user.avatar_url+"&s=130";
      return (
        <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6" >
          <div className="panel panel-default">
            <div className="panel-heading">
              <h3 className="panel-title">{user.login}</h3>
            </div>
            <div className="panel-body">
              <div className="row">
                <div className="col-md-3 col-lg-3 text-center">
                  <a href={user.$githubProfileHref} title={user.$githubProfileHrefTitle}>
                    <img alt="User Pic" src={user.$avatar_url} className="" width="130" height="130"/>
                  </a>
                </div>
                <div className=" col-md-9 col-lg-9 ">
                  <table className="table table-user-information">
                    <tbody>
                      <TrInfo label="Full Name" value={user.name}/>
                      <TrInfo label="Location" value={user.location}/>
                      <TrInfo label="Joined" value={new Date(user.created_at)}/>
                      <TrInfo label="Website" value={user.blog}/>
                      <TrInfo label="Followers" value={user.followers}/>
                      <TrInfo label="Following" value={user.following}/>
                      <TrInfo label="About" value={user.bio}/>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
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