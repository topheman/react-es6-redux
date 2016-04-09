/*!
 * react-es6-redux
 * 
 * A simple app to try React / ES6 & redux, using topheman-apis-proxy as data api backend
 * 
 * @version v3.1.0 - 09/04/2016
 * @revision #43690a9 - https://github.com/topheman/react-es6-redux/tree/43690a9d5a6f68960c02134cf414cceefd44062a
 * @author Christophe Rosset
 * @copyright 2016(c) Christophe Rosset
 * @license MIT
 * 
 */
webpackJsonp([1],{

/***/ 269:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _react = __webpack_require__(8);
	
	var _react2 = _interopRequireDefault(_react);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var Lazy = function Lazy(_ref) {
	  var children = _ref.children;
	
	  return _react2.default.createElement(
	    'div',
	    null,
	    _react2.default.createElement(
	      'h2',
	      null,
	      'This part is lazy-loaded'
	    ),
	    _react2.default.createElement(
	      'div',
	      null,
	      children
	    )
	  );
	};
	
	Lazy.propTypes = {
	  children: _react2.default.PropTypes.node.isRequired
	};
	
	exports.default = Lazy;
	module.exports = exports['default'];

/***/ }

});
//# sourceMappingURL=1-devtools-ed13a51019dd6622003f.chunk.js.map