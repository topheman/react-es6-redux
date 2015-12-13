import httpService from '../../services/httpService.js';

/**
 * If you manage async actions, this will remove a lot of boilerplate,
 * Accepts an action with an object of the form:
 * {
 *   types: ['LOAD', 'LOAD_SUCCESS', 'LOAD_FAILURE'],
 *   promise: (client) => client.get('/url') // needs to return a promise - using the client is not mandatory
 * }
 * It remains compliant with normal actions (see src/redux/modules/multipleUsers.js for example)
 *
 * That way:
 *   - less boilerplate for async actions
 *   - normalization:
 *      - on success: action.result is populated with the response
 *      - on error: action.error is populated with the error
 */
export default ({dispatch, getState}) => {
  return next => action => {
    // the line bellow does exactly the same as redux-thunk (enables dispatching async actions) https://github.com/gaearon/redux-thunk/blob/master/src/index.js
    if (typeof action === 'function') {
      return action(dispatch, getState);
    }

    const { promise, types, ...rest } = action; // eslint-disable-line no-redeclare

    // if no promise passed, simply dispatch like a regular action : {type}
    if (!promise) {
      return next(action);
    }

    // otherwise, extract the types and dispatch each actions on request, success and failure
    const [REQUEST, SUCCESS, FAILURE] = types;
    next({...rest, type: REQUEST});

    // inject here the httpClient so its accessible in the callback if necessary
    return promise(httpService.getInstance()).then(
      (result) => next({...rest, result, type: SUCCESS}),
      (error) => next({...rest, error, type: FAILURE})
    ).catch((error)=> {
      console.error('MIDDLEWARE ERROR:', error);
      next({...rest, error, type: FAILURE});
    });
  };
};
