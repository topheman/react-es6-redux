import React from 'react';

import Panel from '../common/Panel.js';
import Tr from '../common/Tr.js';
import DisplayInfosPanel from '../common/DisplayInfosPanel.js';

const Profile = ({profile}) => {
  if (profile && profile.data) {
    const user = profile.data;
    user.$githubProfileHref = user.html_url;
    user.$githubProfileHrefTitle = 'Visit ' + user.login + ' profile on Github';
    user.$avatar_url = user.avatar_url + '&s=130';
    return (
      <Panel title={user.login}>
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
                  <Tr label="Full Name" value={user.name}/>
                  <Tr label="Location" value={user.location}/>
                  <Tr label="Joined" value={new Date(user.created_at)}/>
                  <Tr type="link" display="colspan" value={user.blog}/>
                  <Tr label="Followers" value={user.followers}/>
                  <Tr label="Following" value={user.following}/>
                  <Tr label="About" value={user.bio}/>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </Panel>
    );
  }
  return (
    <DisplayInfosPanel infos={profile} originalTitle={profile.pristineLogin}/>
  );
};

Profile.propTypes = {
  profile: React.PropTypes.object.isRequired
};

export default Profile;
