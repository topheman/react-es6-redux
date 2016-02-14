import React from 'react';

import { connect } from 'react-redux';

import Header from '../../components/Header/Header.js';
import Footer from '../../components/Footer/Footer.js';

const App = ({ children }) => {
  return (
    <div>
      <Header title="react-es6-redux"/>
      <div className="container">
        {children}
      </div>
      <Footer/>
    </div>
  );
};

App.propTypes = {
  routing: React.PropTypes.object.isRequired,
  children: React.PropTypes.node.isRequired
};

export default connect(state => ({ routing: state.routing }))(App);
