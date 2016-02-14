/*!
 * react-es6-redux
 * 
 * A simple app to try React / ES6 & redux, using topheman-apis-proxy as data api backend
 * 
 * @version v2.6.0 - 14/02/2016
 * @revision #34b2c8a - https://github.com/topheman/react-es6-redux/tree/34b2c8ad5ec30644a2e7a0ed67ffeccde3162dd4
 * @author Christophe Rosset
 * @copyright 2016(c) Christophe Rosset
 * @license MIT
 * 
 */
webpackJsonp([3],{

/***/ 267:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
	
	var _react = __webpack_require__(8);
	
	var _react2 = _interopRequireDefault(_react);
	
	var LazyHome = function LazyHome() {
	  return _react2["default"].createElement(
	    "div",
	    null,
	    _react2["default"].createElement(
	      "p",
	      null,
	      "Welcome to component lazy-loading, thanks to ",
	      _react2["default"].createElement(
	        "a",
	        { href: "https://github.com/rackt/react-router", title: "react-router on github" },
	        "react-router"
	      ),
	      " & ",
	      _react2["default"].createElement(
	        "a",
	        { href: "https://webpack.github.io/docs/code-splitting.html" },
	        "webpack.ensure"
	      ),
	      " !"
	    ),
	    _react2["default"].createElement(
	      "p",
	      null,
	      "Take a look in your devtools, you'll see some chunks required."
	    ),
	    _react2["default"].createElement(
	      "p",
	      null,
	      "There's a bug remaining on this part (an egde case), please consider contribute to ",
	      _react2["default"].createElement(
	        "a",
	        { href: "https://github.com/topheman/react-es6-redux/issues/12" },
	        "this issue"
	      ),
	      " if you've appreciated this project."
	    )
	  );
	};
	
	exports["default"] = LazyHome;
	module.exports = exports["default"];

/***/ }

});
//# sourceMappingURL=3-devtools-7a14d8528de2df238817.chunk.js.map