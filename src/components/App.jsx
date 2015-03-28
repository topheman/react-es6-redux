import React from 'react';
import Router from 'react-router';
var RouteHandler = Router.RouteHandler;
var Link = Router.Link;

import Header from './Header.jsx';

export default class App extends React.Component {
  render() {
    return (
      <div>
        <Header/>
        <div className="container">
          <RouteHandler />
        </div>
      </div>
    )
  }
};