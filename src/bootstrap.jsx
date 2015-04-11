import React from 'react';
import Router from 'react-router';
import routes from './routes.jsx';

//init httpService config
import httpServiceConfiguration from 'httpServiceConfiguration';
import httpService from './services/httpService.js';
httpService.getInstance(httpServiceConfiguration);//will keep config in singleton
//this way, instead of using resolve.alias of webpack (and having the require of module messed up by webpack when they'll be executed server-side)
//I use dependency injection, in the one place that won't be executed in node : the client side bootstrap

Router.run(routes, function(Handler, state){
  var params = state.params;//pass params to handler (this way we will pass data on the express router) https://github.com/rackt/react-router/blob/master/docs/guides/overview.md#dynamic-segments
  React.render(<Handler params={params}/>, document.body);
});