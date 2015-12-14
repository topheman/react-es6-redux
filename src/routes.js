import React from 'react';
import {Route, IndexRoute} from 'react-router';
import {
  App,
  Home,
  Github,
  GithubUser,
  Redux
} from './containers/index';

import Lazy from './containers/Lazy/Lazy';
import LazyHome from './containers/LazyHome/LazyHome';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={Home}/>
    <Route path="github" component={Github}/>
    <Route path="github/user/:username" component={GithubUser}/>
    <Route path="redux" component={Redux}/>
    <Route path="lazy" component={Lazy}>
      <IndexRoute component={LazyHome}/>
    </Route>
  </Route>
);
