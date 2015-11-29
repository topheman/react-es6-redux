'use strict';

import React from 'react';

import Panel from '../common/Panel.jsx';
import DisplayInfosPanel from '../common/DisplayInfosPanel.jsx';
import DisplayStars from '../common/DisplayStars.jsx';
import ReposPaginator from '../ReposPaginator/ReposPaginator.jsx';

export default class Repos extends React.Component {

  static propTypes = {
    repositories: React.PropTypes.object.isRequired,
    reposGotoPage: React.PropTypes.func.isRequired
  }

  constructor(props){

    super(props);

    //init context bindings - due to diff between React.createClass and ES6 class
    this.reposGotoPage = this.reposGotoPage.bind(this);

  }
  reposGotoPage(pageNum){
    this.props.reposGotoPage(pageNum);
  }
  render(){
    const { repositories } = this.props;
    const fetching = repositories.fetching;
    const originalTitle = repositories.pristineLogin + "'s repositories";
    if (repositories && repositories.data){
      const repos = repositories.data;
      return (
        <Panel title={originalTitle}>
          <div className="panel-body repos-list">
            <ReposPaginator infos={repositories.infos} reposGotoPage={this.reposGotoPage} fetching={fetching}/>
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
            <ReposPaginator infos={repositories.infos} reposGotoPage={this.reposGotoPage} fetching={fetching}/>
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
