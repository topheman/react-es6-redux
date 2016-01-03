/*!
 * react-es6-redux
 * 
 * A simple app to try React / ES6 & redux, using topheman-apis-proxy as data api backend
 * 
 * @version v2.6.0 - 03/01/2016
 * @revision #3721629 - https://github.com/topheman/react-es6-redux/tree/37216291f3bf8bdfe3d8c096aad033fa3308f4a3
 * @author Christophe Rosset
 * @copyright 2016(c) Christophe Rosset
 * @license MIT
 * 
 */
webpackJsonp([3],{

/***/ 277:
/***/ function(module, exports, __webpack_require__) {

	/* REACT HOT LOADER */ if (false) { (function () { var ReactHotAPI = require("/Users/Tophe/projects/front/react-es6/node_modules/react-hot-loader/node_modules/react-hot-api/modules/index.js"), RootInstanceProvider = require("/Users/Tophe/projects/front/react-es6/node_modules/react-hot-loader/RootInstanceProvider.js"), ReactMount = require("react/lib/ReactMount"), React = require("react"); module.makeHot = module.hot.data ? module.hot.data.makeHot : ReactHotAPI(function () { return RootInstanceProvider.getRootInstances(ReactMount); }, React); })(); } try { (function () {
	
	"use strict";
	
	exports.__esModule = true;
	
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

	/* REACT HOT LOADER */ }).call(this); } finally { if (false) { (function () { var foundReactClasses = module.hot.data && module.hot.data.foundReactClasses || false; if (module.exports && module.makeHot) { var makeExportsHot = require("/Users/Tophe/projects/front/react-es6/node_modules/react-hot-loader/makeExportsHot.js"); if (makeExportsHot(module, require("react"))) { foundReactClasses = true; } var shouldAcceptModule = true && foundReactClasses; if (shouldAcceptModule) { module.hot.accept(function (err) { if (err) { console.error("Cannot not apply hot update to " + "LazyHome.js" + ": " + err.message); } }); } } module.hot.dispose(function (data) { data.makeHot = module.makeHot; data.foundReactClasses = foundReactClasses; }); })(); } }

/***/ }

});
//# sourceMappingURL=3-devtools-2836b334ca4e737427da.chunk.js.map