'use strict';

import React, { PropTypes } from 'react';
import { Link } from 'react-router';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import CounterButton from './common/CounterButton.jsx';
import * as CounterActions from '../actions/counter.js';


@connect(
    state => ({counter: state.counter}),
    state => bindActionCreators(CounterActions, state)
)
class Counter extends React.Component {

  static propTypes = {
    counter: PropTypes.number.isRequired
  }

  render(){
    let { counter } = this.props;
    return (
      <div>
        <p>I added <a href="http://redux.js.org/" title="About redux">redux</a> to manage state (a flux-like implementation if you will).</p>
        <p>If you clone the project and launch it in local, you'll have access to the redux devtools (hot reloading / state history ...).</p>
        <p>The button bellow is connected to a redux store:</p>
        <p><CounterButton/>{__DEVTOOLS__ ? ' (ctrl+H to hide the debug panel).' : '.'}</p>
        <p>This count is updated via through the actions: <strong>{counter}</strong></p>
        <p><strong>All actions modifying state</strong> on this site are connected to redux.</p>
        <p className="text-center"><Link to="/">Back Home page</Link></p>
      </div>
    );
  }
}

export default Counter;