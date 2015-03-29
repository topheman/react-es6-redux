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
        <p>This is a work in progress, if you want to know more, you can find out the next steps on the <a href="https://github.com/topheman/react-es6" title="react-es6 on github">github repo</a>.</p>
        <p><strong>TLDR;</strong> : click on the button to try it ! (still WIP)</p>
        <p className="text-center"><Link className="btn btn-default btn-primary btn-lg" to="github">TRY the DAMN thing !</Link></p>
      </div>
    );
  }
};