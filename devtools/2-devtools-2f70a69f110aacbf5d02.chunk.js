/*!
 * react-es6-redux
 * 
 * A simple app to try React / ES6 & redux, using topheman-apis-proxy as data api backend
 * 
 * @version v3.1.0 - 16/04/2016
 * @revision #a5f5b75 - https://github.com/topheman/react-es6-redux/tree/a5f5b75e37d9ade51ab861f37c395b9ec6794083
 * @author Christophe Rosset
 * @copyright 2016(c) Christophe Rosset
 * @license MIT
 * 
 */
webpackJsonp([2],{

/***/ 285:
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
//# sourceMappingURL=2-devtools-2f70a69f110aacbf5d02.chunk.js.map