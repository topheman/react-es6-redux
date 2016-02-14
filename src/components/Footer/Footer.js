import React from 'react';

import TwitterButton from './../TwitterButton/TwitterButton.js';

const Footer = ({year}) => (
  <footer className="footer container">
    <p>
      ©{year} <a href="http://labs.topheman.com/">labs.topheman.com</a> - Christophe Rosset<br/>
      <TwitterButton/>
    </p>
  </footer>
);

Footer.propTypes = {
  year: React.PropTypes.number.isRequired
};

export default Footer;
