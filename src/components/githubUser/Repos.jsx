'use strict';

import React from 'react';

import Panel from '../common/Panel.jsx';
import DisplayInfosPanel from '../common/DisplayInfosPanel.jsx';

//@todo cache the last 10 profiles accessed

export default class Repos extends React.Component {
  render(){
    var repositories = this.props.repositories;
    var fetching = repositories.fetching;
    var originalTitle = repositories.pristineLogin + "'s repositories";
    if (repositories && repositories.data){
      var repos = repositories.data;
      originalTitle += ' (' + repos.length +')';
      //sort repos (like github does) the latest update on top
      repos.sort(function(ra,rb){
        return (new Date(rb.updated_at)).getTime() - (new Date(ra.updated_at)).getTime();
      })
      return (
        <Panel title={originalTitle}>
          <div className="list-group col-xs-10 col-xs-offset-1">
            {repos.map(function(repo){
              return(
                <a href={repo.html_url} key={repo.name} className="list-group-item">
                  {repo.name}
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