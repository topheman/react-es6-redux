import React from 'react';

import Panel from './Panel.js';
import Spinner from './Spinner.js';

const DisplayInfosPanel = ({infos, originalTitle}) => {
  const fetching = infos ? infos.fetching : false;
  if (infos && infos.error) {
    const { error } = infos;
    return (
      <Panel title="OOups!">
        <div className="panel-body">
          <div className="row">
            <div className="alert alert-danger col-xs-offset-1 col-xs-10" role="alert">
              {error}
            </div>
          </div>
        </div>
      </Panel>
    );
  }
  // initial case before xhr
  // better speed loading perception if username already present
  return (
    <Panel title={originalTitle}>
      <div className="panel-body">
        <div className="row">
          <Spinner fetching={fetching} className="center-block"/>
        </div>
      </div>
    </Panel>
  );
};

DisplayInfosPanel.propTypes = {
  infos: React.PropTypes.object,
  originalTitle: React.PropTypes.string
};

export default DisplayInfosPanel;
