# webpack splitChunk分包

## 前置：为什么需要分包？
先看本项目中不加分包优化的打包结果：两个入口文件都依赖了loadsh，在最后的打包结果中，一模一样的loadsh代码存在于两份打包目录中；这意味着生产环境上用户访问page1、page2两次的请求都会包含重复的loadsh代码；
更好的做法是把loadsh抽离出来独立打包，这样也能有效利用缓存，因为这种库一般项目内都不会怎么更新，每次发版后依旧能使用之前的缓存。

![打包结果](md-imgs/image.png)

## webpack中默认的分包策略
webpack中默认的分包配置只是针对异步的chunk，这是合理的，因为如果默认对所有的chunk都分包，会导致首屏的请求增多，可能反而负优化首屏加载。
先把默认配置中的chunks从async改为all，看看打包效果：
```js
optimization: {
    splitChunks: {
        chunks: 'all', // 分包策略针对所有chunk
    }
},
```
![chunks: all](md-imgs/image-1.png)

jquery、loadsh已经自动被分离出来了