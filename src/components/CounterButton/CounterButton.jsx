import React, { PropTypes } from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { increment } from '../../redux/modules/counter.js';// import action creators

export class CounterButton extends React.Component {

  static propTypes = {
    increment: PropTypes.func.isRequired,
    counter: PropTypes.number.isRequired
  }

  render() {
    const { counter, increment: incrementCounter } = this.props;
    return (
      <button className="btn btn-primary" type="button" onClick={incrementCounter}>
        Click to increment <span className="badge">{counter}</span>
      </button>
    );
  }
}

/**
 * The connect from react-redux can also be used as an ES7 decorator (babel stage 0)
 * 1rst argument: mapStateToProps - (state) => props
 * 2nd argument: mapDispatchToProps - (dispatch, [ownProps]) => dispatchProps
 *
 * Using bindActionCreators : Turns an object whose values are action creators, into an object with the same keys,
 * but with every action creator wrapped into a dispatch call so they may be invoked directly.
 */
export default connect(
  (state) => ({counter: state.counter}), // mapStateToProps - signature : (state) => props
  (dispatch) => bindActionCreators({ increment }, dispatch)// mapDispatchToProps (using bindActionCreators helper) - http://rackt.org/redux/docs/api/bindActionCreators.html
  // The bindActionCreators results to the following - dispatch in param - wraps the actions in dispatch in a key value object
  // (dispatch) => ({
  //   increment: function(){
  //     return dispatch(CounterActions.increment());
  //   }
  // })
)(CounterButton);
