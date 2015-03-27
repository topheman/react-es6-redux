import React from 'react';
import Router from 'react-router';
var RouteHandler = Router.RouteHandler;
var Link = Router.Link;

export default class App extends React.Component {
  render() {
    return (
      <div>
        <span id="forkongithub"><a href="https://github.com/topheman/react-es6">Fork me on GitHub</a></span>
        <div className="container">
          <header>
            <ul>
              <li><Link to="home">Home</Link></li>
              <li><Link to="about">About</Link></li>
            </ul>
          </header>
          <RouteHandler />
        </div>
      </div>
    )
  }
};