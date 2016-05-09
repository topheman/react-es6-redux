/*!
 * react-es6-redux
 * 
 * A simple app to try React / ES6 & redux, using topheman-apis-proxy as data api backend
 * 
 * @version v3.2.0 - 09/05/2016
 * @revision #f722787 - https://github.com/topheman/react-es6-redux/tree/f722787273e8b20617229be40b49e0ab3fcebbdf
 * @author Christophe Rosset
 * @copyright 2016(c) Christophe Rosset
 * @license MIT
 * 
 */
webpackJsonp([1],{

/***/ 284:
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
//# sourceMappingURL=1-devtools-438f0599c5b61a9bdd05.chunk.js.map