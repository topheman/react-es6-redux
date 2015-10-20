'use strict';

import React from 'react';
import { Link } from 'react-router';

const Home = () => (
  <div>
    <p>This project is a POC based on <strong>React</strong>, coded in <strong>ES6</strong>, relying on <a href="https://github.com/topheman/topheman-apis-proxy" title="topheman-apis-proxy on github">topheman-apis-proxy</a> as a backend (providing the github API).</p>
    <p>This is the front-only part, you can see an isomorphic (universal if you will) version of this project at <a href="https://github.com/topheman/react-es6-isomorphic" title="topheman/react-es6-isomorphic on github">topheman/react-es6-isomorphic</a>.</p>
    <p>It's running on <strong>react v0.14.0</strong></p>
    <p>Please check out the <a href="https://github.com/topheman/react-es6" title="react-es6 on github">github repo</a> or read <a href="http://dev.topheman.com/playing-with-es6-and-react/" title="Playing with React and ES6">the blog post</a> for further informations.</p>
    <p><strong>TL;DR</strong> : click on the button to try it !</p>
    <p className="text-center"><Link className="btn btn-default btn-primary btn-lg" to="/github">TRY the DAMN thing !</Link></p>
  </div>
);

export default Home;