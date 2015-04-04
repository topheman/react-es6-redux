import React from 'react';

import IntroBox from './github/IntroBox.jsx';
import SearchBox from './github/SearchBox.jsx';

export default class Github extends React.Component {
  render() {
    return (
      <div>
        <IntroBox/>
        <SearchBox/>
      </div>
    )
  }
};