import React from 'react';
import Router from 'react-router';
import routes from './routes.jsx';

Router.run(routes, function(Handler, state){
  var params = state.params;//pass params to handler (this way we will pass data on the express router) https://github.com/rackt/react-router/blob/master/docs/guides/overview.md#dynamic-segments
  React.render(<Handler params={params}/>, document.body);
});