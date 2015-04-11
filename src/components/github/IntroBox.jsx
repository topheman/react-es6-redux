'use strict';

import React from 'react';

export default class IntroBox extends React.Component {
  render(){
    return(
      <div>
        <p>This is only a simple feature, search Github users ...</p>
        <p>All the UI is coded in React and ES6, using only isomorphic techs like superagent for the AJAX request (so that it could also work server-side).</p>
      </div>
    );
  }
}