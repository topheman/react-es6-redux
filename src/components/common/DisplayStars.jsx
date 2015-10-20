'use strict';

import React from 'react';

const DisplayStars = ({number}) => {
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
};

export default DisplayStars;