'use strict';

import React, { PropTypes } from 'react';
import { Link } from 'react-router';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Counter from './common/Counter.jsx';
import * as CounterActions from '../actions/counter.js';


@connect(
    state => ({counter: state.counter}),
    state => bindActionCreators(CounterActions, state)
)
class Home extends React.Component {

  static propTypes = {
    counter: PropTypes.number.isRequired
  }

  render(){
    let { counter } = this.props;
    return (
      <div>
        <p>The following button is a redux test : <Counter/> (ctrl+H to hide the debug panel).</p>
        <p>The counter is now at <strong>{counter}</strong></p>
        <p>This project is a POC based on <strong>React</strong>, coded in <strong>ES6</strong>, relying on <a href="https://github.com/topheman/topheman-apis-proxy" title="topheman-apis-proxy on github">topheman-apis-proxy</a> as a backend (providing the github API).</p>
        <p>This is the front-only part, you can see an isomorphic (universal if you will) version of this project at <a href="https://github.com/topheman/react-es6-isomorphic" title="topheman/react-es6-isomorphic on github">topheman/react-es6-isomorphic</a>.</p>
        <p>It's running on <strong>react v0.14.0</strong> - read the <a href="http://dev.topheman.com/upgraded-to-react-v0-14/" title="Upgraded to react v0.14">blog post about the upgrade</a>.</p>
        <p>Please check out the <a href="https://github.com/topheman/react-es6" title="react-es6 on github">github repo</a> or read <a href="http://dev.topheman.com/playing-with-es6-and-react/" title="Playing with React and ES6">the original blog post</a> for further informations.</p>
        <p><strong>TL;DR</strong> : click on the button to try it !</p>
        <p className="text-center"><Link className="btn btn-default btn-primary btn-lg" to="/github">TRY the DAMN thing !</Link></p>
      </div>
    );
  }
}

export default Home;