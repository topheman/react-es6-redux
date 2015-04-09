'use strict';

import React from 'react';

export default class Panel extends React.Component {
  render(){
    var title = this.props.title;
    return(
      <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6" >
        <div className="panel panel-default">
          <div className="panel-heading">
            <h3 className="panel-title">{title}</h3>
          </div>
          {this.props.children}
        </div>
      </div>
    );
  }
}