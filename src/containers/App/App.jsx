'use strict';

import React from 'react';

import { connect } from 'react-redux';

import Header from '../../components/Header/Header.jsx';
import Footer from '../../components/Footer/Footer.jsx';

@connect(state => ({ routerState: state.router }))
class App extends React.Component {

  static propTypes = {
    routerState: React.PropTypes.object.isRequired,
    children: React.PropTypes.node.isRequired
  }

  render() {
    return (
      <div>
        <Header title="react-es6-redux"/>
        <div className="container">
          {this.props.children}
        </div>
        <Footer/>
      </div>
    );
  }

}

export default App;
