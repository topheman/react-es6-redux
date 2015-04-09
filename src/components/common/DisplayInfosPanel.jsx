'use strict';

import React from 'react';

import Panel from '../common/Panel.jsx';
import Spinner from '../common/Spinner.jsx';

//@todo cache the last 10 profiles accessed

export default class DisplayInfosPanel extends React.Component {
  render(){
    var infos = this.props.infos;
    var originalTitle = this.props.originalTitle;
    var fetching = this.props.infos ? this.props.infos.fetching : false;
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
  }
}