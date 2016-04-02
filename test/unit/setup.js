/**
 * This file is only used if you run the tests without karma, but directly with mocha (outside of a browser context)
 * You'll see that is is included in the mocha* npm tasks.
 *
 * This compatibility is kept for the moment, karma provides the possibility to run tests:
 * - in multiple browser
 * - get code coverage reports
 * - ...
 *
 * The unit tests are kept in the /src folder right next to their components.
 *
 * Shallow rendering currently throws an error if setState is called.
 * React seems to expect that, if you use setState, the DOM is available.
 * To work around the issue, we use jsdom so React doesn’t throw the exception when the DOM isn’t available
 *
 * http://rackt.org/redux/docs/recipes/WritingTests.html#fixing-broken-setstate
 */

import { jsdom } from 'jsdom';

global.document = jsdom('<!doctype html><html><body></body></html>');
global.window = document.defaultView;
global.navigator = global.window.navigator;

// make sinon available in global (since it's injected by karma-sinon, we're doing the same for mocha)
global.sinon = require('sinon');
