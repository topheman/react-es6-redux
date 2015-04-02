'use strict';

import React from 'react';

export default class TrInfo extends React.Component {
  render(){
    var label = this.props.label;
    var value = this.props.value;
    if(typeof value !== 'undefined' && !!value){
      if(value instanceof Date){
        value = value.toString().split(' ').slice(0,4).join(' ');//ok I took a very simple way ;-)
      }
      if(label.toLowerCase() === 'website'){
        value = <a href={value}>{value}</a>;
      }
      return (
        <tr>
          <td>{label}</td>
          <td>{value}</td>
        </tr>
      )
    }
    else{
      return(
        <div></div>
      )
    }
  }
}