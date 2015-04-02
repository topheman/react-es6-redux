'use strict';

import React from 'react';

export default class Tr extends React.Component {
  render(){
    var label = this.props.label;
    var value = this.props.value;
    var type = this.props.type;
    var display = this.props.display;
    if(typeof value !== 'undefined' && !!value){
      if(value instanceof Date){
        value = value.toString().split(' ').slice(0,4).join(' ');//ok I took a very simple way ;-)
      }
      if(type === 'link'){
        value = <a href={value}>{value}</a>;
      }

      if(display !== 'colspan'){
        return (
          <tr>
            <td>{label}</td>
            <td>{value}</td>
          </tr>
        )
      }
      else{
        return (
          <tr>
            <td colSpan="2">{value}</td>
          </tr>
        )
      }
    }
    else{
      return <noscript/>;
    }
  }
}