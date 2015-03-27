'use strict';

import React from 'react';
import {Route, DefaultRoute} from 'react-router';
import App from './components/App.jsx';
import Home from './components/Home.jsx';
import About from './components/About.jsx';

export default (
  <Route name="app" path="/" handler={App}>
    <Route name="home" path="/" handler={Home}/>
    <Route name="about" path="/about" handler={About}/>
    <DefaultRoute handler={Home}/>
  </Route>
);