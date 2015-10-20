'use strict';

import React from 'react';
//import Router from 'react-router';
//var RouteHandler = Router.RouteHandler;

import Header from './Header.jsx';
import Footer from './Footer.jsx';

const App = ({children}) => (
  <div>
    <Header title="react-es6"/>
    <div className="container">
      {children}
    </div>
    <Footer/>
  </div>
);

export default App;