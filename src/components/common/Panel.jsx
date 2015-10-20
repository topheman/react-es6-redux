'use strict';

import React from 'react';

const Panel = ({title, children}) => (
  <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6" >
    <div className="panel panel-default">
      <div className="panel-heading">
        <h3 className="panel-title">{title}</h3>
      </div>
      {children}
    </div>
  </div>
);

export default Panel;