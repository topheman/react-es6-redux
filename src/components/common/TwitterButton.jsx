'use strict';

import React from 'react';

export default class TwitterButton extends React.Component {
  render(){
    return (
      <a href="https://twitter.com/share" className="twitter-share-button" data-text="Simple #reactjs #es6 using Github API" data-via="topheman" data-size="large" data-count="none" data-url="https://topheman.github.io/react-es6/">Tweet</a>
    );
  }
}