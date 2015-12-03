/**
 * This goes through redux's applyMiddleware http://redux.js.org/docs/api/applyMiddleware.html
 * any middleware should have the following signature : ({ getState, dispatch }) => next => action
 */

export default function logger({ getState }) {
  return next => action => {
    console.group(action.type);
    console.log('will dispatch', action);
    const result = next(action);
    console.log('state after dispatch', getState());
    console.groupEnd();

    return result;
  };
}
