// 测试babel-parser
const parser = require('@babel/parser');
const ast = parser.parse('const a = 1');
console.log(ast);