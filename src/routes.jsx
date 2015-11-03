'use strict';

import React from 'react';
import {Route, IndexRoute} from 'react-router';
import App from './components/App.jsx';
import Home from './components/Home.jsx';
import Github from './components/Github.jsx';
import GithubUser from './components/GithubUser.jsx';
import Redux from './components/Redux.jsx';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={Home}/>
    <Route path="github" component={Github}/>
    <Route path="github/user/:username" component={GithubUser}/>
    <Route path="redux" component={Redux}/>
  </Route>
);