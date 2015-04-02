'use strict';

import React from 'react';

export default class Spinner extends React.Component {
  constructor(props){
    super(props);
    this.state = {};
  }
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