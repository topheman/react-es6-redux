'use strict';

import React from 'react';
import Router from 'react-router';

var Link = Router.Link;

export default class Home extends React.Component {
  render() {
    return (
      <div>
        <p>This project is a POC with the following constraints :</p>
        <ul>
          <li>Use React</li>
          <li>Use ES6</li>
        </ul>
        <p>This is the second step to a bigger project : <strong>making an isomorphic app</strong> with those technologies
          (the first step being my previous project : <a href="https://github.com/topheman/topheman-apis-proxy" title="topheman-apis-proxy on github">topheman-apis-proxy</a> which I'm relying on to access data like the one provided
          by the Github API).
        </p>
        <p>
          The project is pretty much finished, <a href="https://github.com/topheman/react-es6/issues/2" title="Github issue on Flux implementation for this project">flux could be implemented for state management</a>.
          You can access the source code on the <a href="https://github.com/topheman/react-es6" title="react-es6 on github">github repo</a> and also read <a href="http://dev.topheman.com/playing-with-es6-and-react/" title="Playing with React and ES6">the blog post</a> about it.
        </p>
        <p><strong>TL;DR</strong> : click on the button to try it !</p>
        <p className="text-center"><Link className="btn btn-default btn-primary btn-lg" to="github">TRY the DAMN thing !</Link></p>
        <p>The third step (turning the app to isomorphic is now finished, you can try <a href="https://topheman-react-es6-isomorphic.herokuapp.com/" title="Try topheman/react-es6-isomorphic">topheman/react-es6-isomorphic - demo</a>)</p>
      </div>
    );
  }
};