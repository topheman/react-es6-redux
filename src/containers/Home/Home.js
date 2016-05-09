import React from 'react';
import { Link } from 'react-router';

const prodMessage = (<div>
  <p>This is the <strong>production packaged</strong> version (html/css/js uglified). You can <a href="./devtools/" title="Test with devtools & sourcemaps" style={{fontWeight: 'bold'}}>test the site in debug mode here</a>, where you'll have access to:</p>
  <ul>
    <li>sourcemaps for <code>.scss</code>/<code>.js</code></li>
    <li>redux devtools</li>
  </ul>
  <p className="text-center"><a href="./devtools/" title="Test with devtools & sourcemaps" className="btn btn-default btn-primary" style={{whiteSpace: 'pre-wrap'}}>I'm a developer, I want to see what's under the hood!</a></p>
</div>);

const devtoolsMessage = (<div>
  <p>This is the <strong>development packaged</strong> version (<a href="../" title="checkout in production mode">the production version is here</a>). In the current mode, you have access to:</p>
  <ul>
    <li>sourcemaps for <code>.scss</code>/<code>.js</code> (open the sources tab of your developer tools)</li>
    <li><a href="https://github.com/gaearon/redux-devtools" title="redux-devtools">redux devtools</a> (this is the tab you can see on the right - ctrl+H to toggle hide - ctrl+Q to change position), it lets you play with history state of redux</li>
  </ul>
  <p>Those features are meant to be used only in the development but I felt it would be a great way to let you discover them.</p>
</div>);

const Home = () => {
  return (
    <div>
      <p>This project is a POC based on <strong>React</strong>, coded in <strong>ES6</strong>, relying on <a href="https://github.com/topheman/topheman-apis-proxy" title="topheman-apis-proxy on github">topheman-apis-proxy</a> as a backend (providing the github API) and using <Link to="/redux" style={{fontWeight: 'bold'}}>redux</Link> for state management.</p>
      <p>This is the front-only part, you can see an isomorphic (universal if you will) version of this project at <a href="https://github.com/topheman/react-es6-isomorphic" title="topheman/react-es6-isomorphic on github">topheman/react-es6-isomorphic</a>.</p>
      <p><strong>TL;DR</strong> : click on the button to try it !</p>
      <p className="text-center"><Link className="btn btn-default btn-primary btn-lg" to="/github">TRY the DAMN thing !</Link></p>
      {process.env.DEVTOOLS ? devtoolsMessage : prodMessage }
    </div>
  );
};

export default Home;
