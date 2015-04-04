import React from 'react';

import IntroBox from './github/IntroBox.jsx';
import SearchBox from './github/SearchBox.jsx';

//@todo refactor have this class hold the state (not the search box)

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