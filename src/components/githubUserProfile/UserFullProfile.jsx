'use strict';

import React from 'react';

import Panel from '../common/Panel.jsx';
import TrInfo from './TrInfo.jsx';
import Spinner from '../common/Spinner.jsx';

//@todo cache the last 10 profiles accessed

export default class UserFullProfile extends React.Component {
  render(){
    var profile = this.props.profile;
    var fetching = profile.fetching;
    if (profile && profile.data){
      var user = profile.data;
      user.$githubProfileHref = user.html_url;
      user.$githubProfileHrefTitle = "Visit " + user.login + " profile on Github";
      user.$avatar_url = user.avatar_url+"&s=130";
      return (
        <Panel title={user.login}>
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
        </Panel>
      );
    }
    else if(profile && profile.error){
      var error = profile.error;
      return (
        <Panel title="OOups!">
          <div className="alert alert-danger col-xs-offset-1 col-xs-10" role="alert">
          {error}
          </div>
        </Panel>
      );
    }
    else{
      //initial case before xhr
      //better speed loading perception if username already present
      return(
        <Panel title={profile.pristineLogin}>
          <Spinner fetching={fetching} className="center-block"/>
        </Panel>
      );
    }
  }
}