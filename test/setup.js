'use strict';

/**
 * Shallow rendering currently throws an error if setState is called.
 * React seems to expect that, if you use setState, the DOM is available.
 * To work around the issue, we use jsdom so React doesn’t throw the exception when the DOM isn’t available
 *
 * http://rackt.org/redux/docs/recipes/WritingTests.html#fixing-broken-setstate
 */

import { jsdom } from 'jsdom'

global.document = jsdom('<!doctype html><html><body></body></html>')
global.window = document.defaultView
global.navigator = global.window.navigator