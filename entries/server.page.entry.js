/**
 * 为按需编译埋伏笔
 * 多页面client端是多入口打包，一个页面一个chunk，可以正常的改造为按需编译，
 * 但server端是单入口只有一个chunk，所以不能在入口文件中显示地使用import APP from ‘xxx’，这样页面组件相关一开始就会被打进依赖
 * 应该用entry: { index: ['entries/server.page.entry.js', 'server/index.js'] } 这种写法
 * 再通过一个中间变量config，通过set/get config动态的获取页面组件
 */
import page1 from '@/page1';

export default {
    page1,
};
