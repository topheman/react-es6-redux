'use strict';

import React from 'react';

import TwitterButton from './common/TwitterButton.jsx';

export default class Footer extends React.Component {
  render(){
    return(
      <footer className="footer container">
        <p>
          ©2015 <a href="http://labs.topheman.com/">labs.topheman.com</a> - Christophe Rosset<br/>
          <TwitterButton/>
        </p>
      </footer>
    )
  }
}