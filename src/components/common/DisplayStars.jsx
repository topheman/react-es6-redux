'use strict';

import React from 'react';

export default class DisplayStars extends React.Component {
  render(){
    var number = this.props.number;
    if(number > 0){
      return(
        <span>
          {number} <span className="glyphicon glyphicon-star"></span>
        </span>
      )
    }
    else{
      return <noscript/>
    }
  }
}