import React from 'react';

const LazyHome = () => {
  return (
    <div>
      <p>Welcome to component lazy-loading, thanks to <a href="https://github.com/rackt/react-router" title="react-router on github">react-router</a> & <a href="https://webpack.github.io/docs/code-splitting.html">webpack.ensure</a> !</p>
      <p>Take a look in your devtools, you'll see some chunks required.</p>
    </div>
  );
};

export default LazyHome;
