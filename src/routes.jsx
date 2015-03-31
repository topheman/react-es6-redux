'use strict';

import React from 'react';
import {Route, DefaultRoute} from 'react-router';
import App from './components/App.jsx';
import Home from './components/Home.jsx';
import Github from './components/Github.jsx';
import GithubUserProfile from './components/GithubUserProfile.jsx';

export default (
  <Route name="app" path="/" handler={App}>
    <Route name="home" path="/" handler={Home}/>
    <Route name="github" path="/github" handler={Github}/>
    <Route name="githubUserProfile" path="/github/user/:username" handler={GithubUserProfile}/>
    <DefaultRoute handler={Home}/>
  </Route>
);