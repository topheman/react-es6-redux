'use strict';

import React, { PropTypes } from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as CounterActions from '../../actions/counter.js';

function mapStateToProps(state) {
  return {
    counter: state.counter
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(CounterActions, dispatch);
}

@connect(mapStateToProps, mapDispatchToProps)
class Counter extends React.Component {

  static propTypes = {
    increment: PropTypes.func.isRequired,
    counter: PropTypes.number.isRequired
  }

  render(){
    console.log('render counter');
    const { counter, increment } = this.props;
    return(
      <button className="btn btn-default" onClick={increment}>Clicked : {counter}</button>
    );
  }
}

export default Counter;