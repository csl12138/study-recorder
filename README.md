## 如何跑起来
- 确保已经全局安装npm-run-all nodemon
- node>=14
## 踩坑记录
**为什么server端不全量打包，只打包renderer？**
> server端全量打包会导致如果改动了任何页面的jsx代码，server和client肯定会重新编译打包，而server端肯定会生成新的dist/server/index.js，这样nodemon就会重新运行index.js，进而重启整个server，那与client的热更新就会断开，如果不刷新页面，热更新将失效；所以那就意味着如果打包整个server，每次更改页面代码，server重启，热更新失效，必须手动刷新才能看见最新的代码效果；所以只打包render有关逻辑，server重新打包并不会影响整个server app，最大限度减少server端重启次数，保证热更新，当然如果修改了server app相关的代码，肯定是会重启server的，无法避免。但现在因为纯node代码损失了很多新特性(可选链啥的)，并且只能使用cjs，写起来比较割裂，**打算把server中未经webpack编译的模块用babel编译一遍**

**服务端使用css-modules？**
> css-loader开启 exportOnlyLocals: true；开启后css-loader可独立工作，css-loader仅导出locals对应关系对象；网上大部分说法是使用isomorphic-style-loader，但不使用该loader构建服务端css string的功能下用它反而是一种负担。

**资源清单？**
> 常见的webpack-manifest-plugin，貌似没有办法做成按entry分类好css/js，手动处理比较麻烦，并且开始useEntryKeys的时候清单里没有css；退而求其次使用assets-webpack-plugin，可以很好的输出资源文件，但就是开启keepInMemory时和devServer/devMiddleware冲突会报错。

**babel cli --config-file参数报错？**
> 最开始使用时一直报错“cannot find module”，后来发现是一定要在路径前加上‘./’，不然会从node_modules中去找。参考：https://github.com/babel/babel/issues/8919

**SSR热更新？**
> 如果单纯使用webpack-hot-middleware 配合 入口模块的 if(module.hot)... 虽然不会reload，但是会丢失input状态，是「伪」热更新，需要webpack-hot-middleware 配合 react-refresh-webpack-plugin

## 热更新参考文档
- https://xiaohanglin.site/pages/fac66c/
- https://webpack.wuhaolin.cn/3%E5%AE%9E%E6%88%98/3-18%E4%BD%BF%E7%94%A8WebpackDevMiddleware.html#google_vignette
- https://juejin.cn/post/7144905013016395783#heading-9
- https://juejin.cn/post/7156468732817047588
- https://juejin.cn/post/7168271366519521316#heading-11

## 多页面项目按需编译参考文档
- https://juejin.cn/post/6877123009555988493?searchId=20240114203439F4D16FFC654A14781ADF
- https://juejin.cn/post/6844903636447789064#heading-6