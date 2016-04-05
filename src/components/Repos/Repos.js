import React from 'react';

import Panel from '../common/Panel.js';
import DisplayInfosPanel from '../common/DisplayInfosPanel.js';
import DisplayStars from '../common/DisplayStars.js';
import ReposPaginator from '../ReposPaginator/ReposPaginator.js';

export default class Repos extends React.Component {

  static propTypes = {
    repositories: React.PropTypes.object.isRequired,
    reposGotoPage: React.PropTypes.func.isRequired
  }

  render() {
    const { repositories, reposGotoPage } = this.props;
    const fetching = repositories.fetching;
    const originalTitle = repositories.pristineLogin + "'s repositories";
    if (repositories && repositories.data) {
      const repos = repositories.data;
      return (
        <Panel title={originalTitle}>
          <div className="panel-body repos-list">
            <ReposPaginator infos={repositories.infos} reposGotoPage={reposGotoPage} fetching={fetching}/>
            <div className="list-group">
              {repos.map((repo) => {
                return (
                  <a href={repo.html_url} key={repo.name} className="list-group-item" title={repo.full_name}>
                    {repo.name}
                    <div className="pull-right">
                      <DisplayStars number={repo.stargazers_count}/>
                    </div>
                  </a>
                );
              })}
            </div>
            <ReposPaginator infos={repositories.infos} reposGotoPage={reposGotoPage} fetching={fetching}/>
          </div>
        </Panel>
      );
    }
    return (
      <DisplayInfosPanel infos={repositories} originalTitle={originalTitle}/>
    );
  }
}
