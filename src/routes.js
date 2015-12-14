import React from 'react';
import {Route, IndexRoute} from 'react-router';
import {
  App,
  Home,
  Github,
  GithubUser,
  Redux
} from './containers/index';

const lazyRouteLoader = (location, cb) => {
  require.ensure([], (require) => {
    cb(null, require('./containers/Lazy/Lazy'));
  });
};

const lazyHomeRouteLoader = (location, cb) => {
  require.ensure([], (require) => {
    cb(null, require('./containers/LazyHome/LazyHome'));
  });
};

export default (
  <Route path="/" component={App}>
    <IndexRoute component={Home}/>
    <Route path="github" component={Github}/>
    <Route path="github/user/:username" component={GithubUser}/>
    <Route path="redux" component={Redux}/>
    <Route path="lazy" getComponent={lazyRouteLoader}>
      <IndexRoute getComponent={lazyHomeRouteLoader}/>
    </Route>
  </Route>
);
