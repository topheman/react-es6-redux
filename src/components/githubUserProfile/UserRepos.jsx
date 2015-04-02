'use strict';

import React from 'react';

import Panel from '../common/Panel.jsx';
import DisplayInfosPanel from '../common/DisplayInfosPanel.jsx';

//@todo cache the last 10 profiles accessed

export default class UserRepos extends React.Component {
  render(){
    var repositories = this.props.repositories;
    var fetching = repositories.fetching;
    if (repositories && repositories.data){
      var repos = repositories.data;
      console.log(repos);
      return (
        <noscript/>
      );
    }
    else {
      var originaleTitle = repositories.pristineLogin + "'s repositories"
      return(
        <DisplayInfosPanel infos={repositories} originalTitle={originaleTitle}/>
      )
    }
  }
}