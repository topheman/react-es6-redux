'use strict';

import React from 'react';
import Router from 'react-router';

var Link = Router.Link;

export default class Header extends React.Component {
  constructor(props){
    //can't use getInitialState with React+ES6 (this is why must create contstructor that calls super + init state)
    super(props);
    this.state = {collapsed: true};

    //reswitch context due to ES6 classes context management with React :-(
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick(e){
    console.log(this);
    console.log('click', this.state.collapsed);
    var collapsed = this.state.collapsed;
    this.setState({collapsed:!collapsed});
  }
  render() {

    var collapsedMenuClassName = "collapse navbar-collapse" + (this.state.collapsed === true ? "" : " in");

    return (
      <div>
        <nav className="navbar navbar-default" role="navigation">
          <div className="container-fluid">
            <!-- Brand and toggle get grouped for better mobile display -->
            <div className="navbar-header">
              <button type="button" onClick={this.handleClick} className="navbar-toggle" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
                <span className="sr-only">Toggle navigation</span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
              </button>
              <Link className="navbar-brand logo" to="home">
                <span>{this.props.title}</span>
              </Link>
            </div>

            <!-- Collect the nav links, forms, and other content for toggling -->
            <div className={collapsedMenuClassName} id="bs-example-navbar-collapse-1">
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