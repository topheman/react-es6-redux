'use strict';

import React, { PropTypes } from 'react';

import { connect } from 'react-redux';

import Header from './Header.jsx';
import Footer from './Footer.jsx';

@connect(state => ({ routerState: state.router }))
class App extends React.Component {

  static propTypes = {
    children: PropTypes.node
  }

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

export default App;