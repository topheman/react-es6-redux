/**
 * This file includes some setups for the unit tests
 */

/**
 * Make console.error throw to fail tests to brake the build on console.error
 * Might be from:
 * - invalid PropTypes
 * - deprecated apis
 * - ...
 */
console.error = function consoleErrorThatThrows(message) {
  throw new Error(message);
};
