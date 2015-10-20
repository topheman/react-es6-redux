'use strict';

import React from 'react';

const Tr = ({label, value, type, display}) => {
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
    //won't return <noscript/> if so, getting following : Warning: validateDOMNesting(...): <noscript> cannot appear as a child of <tbody>. See Profile > tbody > Tr > noscript.
    return <tr/>;
  }
};

export default Tr;