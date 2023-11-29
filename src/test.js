// 测试babel编译结果
import { a } from './a';
console.log('a', a);
const c = 1;
const promise = new Promise(resolve => {
    resolve(1);
});
class TestClass {};