'use strict';

import React from 'react';
import { IndexLink, Link } from 'react-router';

export default class Header extends React.Component {
  constructor(props){

    super(props);

    //init context bindings - due to diff between React.createClass and ES6 class
    this._getInitialState = this._getInitialState.bind(this);
    this.handleClick = this.handleClick.bind(this);

    //init state
    this.state = this._getInitialState();

  }
  _getInitialState(){
    return {collapsed: true};
  }
  handleClick(e){
    var collapsed = this.state.collapsed;
    this.setState({collapsed:!collapsed});
  }
  render() {

    var collapsedMenuClassName = "collapse navbar-collapse" + (this.state.collapsed === true ? "" : " in");

    return (
      <div>
        <nav className="navbar navbar-default" role="navigation">
          <div className="container-fluid">
            <div className="navbar-header">
              <button type="button" onClick={this.handleClick} className="navbar-toggle" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
                <span className="sr-only">Toggle navigation</span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
              </button>
              <IndexLink to="/" className="navbar-brand logo">
                <span>{this.props.title}</span>
              </IndexLink>
            </div>

            <div className={collapsedMenuClassName} id="bs-example-navbar-collapse-1">
              <ul className="nav navbar-nav">
                <li><Link to="/github">Search Github Users</Link></li>
                <li><Link to="/redux">About Redux</Link></li>
              </ul>
            </div>
          </div>
        </nav>

        <ul className="site-networks">
          <li className="twitter">
            <a href="https://twitter.com/topheman" title="@topheman on twitter">
              <span className="icon"></span>
              <span className="desc">Twitter</span>
            </a>
          </li>
          <li className="github">
            <a href="https://github.com/topheman/react-es6-redux" title="Fork on github">
              <span className="icon"></span>
              <span className="desc">Github</span>
            </a>
          </li>
        </ul>
      </div>
    );
  }
}