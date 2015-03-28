import React from 'react';

import IntroBox from './github/IntroBox.jsx';
import SearchUsersBox from './github/SearchUsersBox.jsx';
import UsersSimpleProfileList from './github/UsersSimpleProfileList.jsx';

export default class About extends React.Component {
  render() {
    return (
      <div>
        <IntroBox/>
        <SearchUsersBox/>
        <UsersSimpleProfileList/>
      </div>
    )
  }
};