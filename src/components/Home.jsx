'use strict';

import React from 'react';
import { Link } from 'react-router';

const prodMessage = (<div>
  <p>This is the <strong>production packaged</strong> version (html/css/js uglified). You can <a href="./devtools.html" title="Test with devtools & sourcemaps" style={{fontWeight:"bold"}}>test the site in debug mode here</a>, where you'll have access to:</p>
  <ul>
    <li>sourcemaps for css/js</li>
    <li>redux devtools</li>
  </ul>
</div>);

const devtoolsMessage = (<div>
  <p>This is the <strong>development packaged</strong> version (<a href="./" title="checkout in production mode">the production version is here</a>). In the current mode, you have access to:</p>
  <ul>
    <li>sourcemaps for css/js (open the sources tab of your developer tools)</li>
    <li><a href="https://github.com/gaearon/redux-devtools" title="redux-devtools">redux devtools</a> (this is the tab you can see on the right - ctrl+H to toggle hide), it lets you play with history state of redux</li>
  </ul>
  <p>Those features are meant to be used only in the development but I felt it would be a great way to let you discover them.</p>
</div>);

const Home = () => {
  return (
    <div>
      <p>This project is a POC based on <strong>React</strong>, coded in <strong>ES6</strong>, relying on <a href="https://github.com/topheman/topheman-apis-proxy" title="topheman-apis-proxy on github">topheman-apis-proxy</a> as a backend (providing the github API).</p>
      <p>This is the front-only part, you can see an isomorphic (universal if you will) version of this project at <a href="https://github.com/topheman/react-es6-isomorphic" title="topheman/react-es6-isomorphic on github">topheman/react-es6-isomorphic</a>.</p>
      <p>It's running on <strong>react v0.14.0</strong> - read the <a href="http://dev.topheman.com/upgraded-to-react-v0-14/" title="Upgraded to react v0.14">blog post about the upgrade</a>. I've just added <Link to="/redux">redux</Link>.</p>
      <p>Please check out the <a href="https://github.com/topheman/react-es6" title="react-es6 on github">github repo</a> or read <a href="http://dev.topheman.com/playing-with-es6-and-react/" title="Playing with React and ES6">the original blog post</a> for further informations.</p>
      <p><strong>TL;DR</strong> : click on the button to try it !</p>
      <p className="text-center"><Link className="btn btn-default btn-primary btn-lg" to="/github">TRY the DAMN thing !</Link></p>
      {__DEVTOOLS__ ? devtoolsMessage : prodMessage }
    </div>
  );
}

export default Home;