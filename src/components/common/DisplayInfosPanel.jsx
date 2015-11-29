'use strict';

import React from 'react';

import Panel from './Panel.jsx';
import Spinner from './Spinner.jsx';

const DisplayInfosPanel = ({infos, originalTitle}) => {
  var fetching = infos ? infos.fetching : false;
  if(infos && infos.error){
    var error = infos.error;
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
  else{
    //initial case before xhr
    //better speed loading perception if username already present
    return(
      <Panel title={originalTitle}>
        <div className="panel-body">
          <div className="row">
            <Spinner fetching={fetching} className="center-block"/>
          </div>
        </div>
      </Panel>
    );
  }
};

export default DisplayInfosPanel;
