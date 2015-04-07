'use strict';

import React from 'react';

import Panel from '../common/Panel.jsx';
import DisplayInfosPanel from '../common/DisplayInfosPanel.jsx';
import DisplayStars from '../common/DisplayStars.jsx';

//@todo cache the last 10 profiles accessed

export default class Repos extends React.Component {
  render(){
    var repositories = this.props.repositories;
    var fetching = repositories.fetching;
    var originalTitle = repositories.pristineLogin + "'s repositories";
    if (repositories && repositories.data){
      var repos = repositories.data;
      originalTitle += ' (' + repos.length +')';
      return (
        <Panel title={originalTitle}>
          <div className="list-group">
            {repos.map(function(repo){
              return(
                <a href={repo.html_url} key={repo.name} className="list-group-item" title={repo.full_name}>
                  {repo.name}
                  <div className="pull-right">
                    <DisplayStars number={repo.stargazers_count}/>
                  </div>
                </a>
              )
            })}
          </div>
        </Panel>
      );
    }
    else {
      return(
        <DisplayInfosPanel infos={repositories} originalTitle={originalTitle}/>
      )
    }
  }
}