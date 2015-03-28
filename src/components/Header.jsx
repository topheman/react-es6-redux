'use strict';

import React from 'react';
import Router from 'react-router';

var Link = Router.Link;

export default class Header extends React.Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-default" role="navigation">
          <div className="container-fluid">
            <!-- Brand and toggle get grouped for better mobile display -->
            <div className="navbar-header">
              <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
                <span className="sr-only">Toggle navigation</span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
              </button>
              <Link className="navbar-brand logo" to="home">
                <span>react-es6</span>
              </Link>
            </div>

            <!-- Collect the nav links, forms, and other content for toggling -->
            <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
              <ul className="nav navbar-nav">
                <li><Link to="about">About</Link></li>
              </ul>
            </div>
            <!-- /.navbar-collapse -->
          </div>
          <!-- /.container-fluid -->
        </nav>

        <ul className="site-networks">
          <li className="twitter">
            <a href="https://twitter.com/topheman" title="@topheman on twitter">
              <span className="icon"></span>
              <span className="desc">Twitter</span>
            </a>
          </li>
          <li className="github">
            <a href="https://github.com/topheman/react-es6" title="Fork on github">
              <span className="icon"></span>
              <span className="desc">Github</span>
            </a>
          </li>
        </ul>
      </div>
    );
  }
}