/*!
 * react-es6-redux
 * 
 * A simple app to try React / ES6 & redux, using topheman-apis-proxy as data api backend
 * 
 * @version v3.2.1 - 17/08/2016
 * @revision #d0bdba8 - https://github.com/topheman/react-es6-redux/tree/d0bdba872db622f5486195bf58c9efdf8930a3df
 * @author Christophe Rosset
 * @copyright 2016(c) Christophe Rosset
 * @license MIT
 * 
 */
webpackJsonp([1],{

/***/ 295:
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
//# sourceMappingURL=1-devtools-e0192d1a0818a05e35e7.chunk.js.map