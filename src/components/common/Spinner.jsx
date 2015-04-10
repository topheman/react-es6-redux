'use strict';

import React from 'react';

export default class Spinner extends React.Component {
  render(){
    var fetching = this.props.fetching;
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
}