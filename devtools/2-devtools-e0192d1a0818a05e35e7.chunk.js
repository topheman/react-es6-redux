/*!
 * react-es6-redux
 * 
 * A simple app to try React / ES6 & redux, using topheman-apis-proxy as data api backend
 * 
 * @version v3.2.1 - 17/08/2016
 * @revision #aaa424c - https://github.com/topheman/react-es6-redux/tree/aaa424c46492dccd0badccbdf50236d2fdc3bd3f
 * @author Christophe Rosset
 * @copyright 2016(c) Christophe Rosset
 * @license MIT
 * 
 */
webpackJsonp([2],{

/***/ 296:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _react = __webpack_require__(8);
	
	var _react2 = _interopRequireDefault(_react);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var LazyHome = function LazyHome() {
	  return _react2.default.createElement(
	    "div",
	    null,
	    _react2.default.createElement(
	      "p",
	      null,
	      "Welcome to component lazy-loading, thanks to ",
	      _react2.default.createElement(
	        "a",
	        { href: "https://github.com/rackt/react-router", title: "react-router on github" },
	        "react-router"
	      ),
	      " & ",
	      _react2.default.createElement(
	        "a",
	        { href: "https://webpack.github.io/docs/code-splitting.html" },
	        "webpack.ensure"
	      ),
	      " !"
	    ),
	    _react2.default.createElement(
	      "p",
	      null,
	      "Take a look in your devtools, you'll see some chunks required."
	    )
	  );
	};
	
	exports.default = LazyHome;
	module.exports = exports['default'];

/***/ }

});
//# sourceMappingURL=2-devtools-e0192d1a0818a05e35e7.chunk.js.map