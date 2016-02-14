/*!
 * react-es6-redux
 * 
 * A simple app to try React / ES6 & redux, using topheman-apis-proxy as data api backend
 * 
 * @version v2.7.0 - 14/02/2016
 * @revision #e8adb11 - https://github.com/topheman/react-es6-redux/tree/e8adb11c6634267ef42a2e76833a81970e08267b
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
	    )
	  );
	};
	
	exports["default"] = LazyHome;
	module.exports = exports["default"];

/***/ }

});
//# sourceMappingURL=3-devtools-e542b6f1a1d1ac12566f.chunk.js.map