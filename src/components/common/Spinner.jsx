'use strict';

import React from 'react';

export default class Spinner extends React.Component {
  constructor(props){
    super(props);
    this.state = {};
  }
  render(){
    var fetching = this.props.fetching;
    console.log('fetching',fetching);
    if(fetching == true){
      console.log('so it true');
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