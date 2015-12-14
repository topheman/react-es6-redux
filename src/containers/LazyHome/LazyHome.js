import React from 'react';

const LazyHome = () => {
  return (
    <div>
      <p>Welcome to component lazy-loading, thanks to <a href="https://github.com/rackt/react-router" title="react-router on github">react-router</a> & <a href="https://webpack.github.io/docs/code-splitting.html">webpack.ensure</a> !</p>
      <p>Take a look in your devtools, you'll see some chunks required.</p>
      <p>There's a bug remaining on this part (an egde case), please consider contribute to <a href="https://github.com/topheman/react-es6-redux/issues/12">this issue</a> if you've appreciated this project.</p>
    </div>
  );
};

export default LazyHome;
