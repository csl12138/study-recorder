import _createClass from "@babel/runtime/helpers/createClass";
import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import "core-js/modules/es.object.to-string.js";
import "core-js/modules/es.promise.js";
// 测试babel编译结果
var _require = require('./a'),
  a = _require.a;
// import { a } from './a';
console.log('a', a);
var c = 1;
var promise = new Promise(function (resolve) {
  resolve(1);
});
var TestClass = /*#__PURE__*/_createClass(function TestClass() {
  _classCallCheck(this, TestClass);
});
;
