'use strict';

import React from 'react';

const Spinner = ({fetching}) => {
  if(fetching == true){
    return (
      <div className="spinner">
        <div className="bounce1"></div>
        <div className="bounce2"></div>
        <div className="bounce3"></div>
      </div>
    )
  }
  else{
    return (
      <div className="spinner"></div>
    )
  }
}

export default Spinner;