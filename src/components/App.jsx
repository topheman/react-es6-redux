'use strict';

import React, { PropTypes } from 'react';

import { connect } from 'react-redux';

import Header from './Header.jsx';
import Footer from './Footer.jsx';

//@connect(state => ({ routerState: state.router })) - bellow the ES6 version without using decorators
var App = (function(){

  class App extends React.Component {

    render() {
      return (
        <div>
          <Header title="react-es6"/>
          <div className="container">
            {this.props.children}
          </div>
          <Footer/>
        </div>
      );
    }

  }

  App.propTypes = {
    children: PropTypes.node
  };

  App = connect(state => ({ routerState: state.router }))(App);

  return App;

})();

export default App;