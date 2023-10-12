# webpack splitChunk分包

## 参考链接：
https://juejin.cn/post/6844903680307625997?searchId=202310061134462AF5644FDA51D05F0721#heading-13
https://segmentfault.com/a/1190000042093955#item-3
https://www.cnblogs.com/kwzm/p/10315080.html

## 前置：为什么需要分包？
page1 / page2 两个入口文件如下：
```js
// page1
import $ from 'jquery';
import _ from 'loadsh';

const person = { name: 'ccc', age: 18, look: 'handsome', height: 'normal' };
const perfectPerson = _.omit(person, 'height');
console.log('😎😎😎 ~ perfectPerson:', perfectPerson);

$('#main').css({ color: '#f40' });

// page2
import _ from 'loadsh';

const str = 'abc';

const newStr = _.pad(str, 5, '_');
console.log('newStr', newStr);

```
**两个入口文件都依赖了loadsh**，在没有手动配置splitChunks的前提下，在最后的打包结果中，一模一样的loadsh代码存在于两份打包目录中；这意味着生产环境上用户访问page1、page2两次的请求都会包含重复的loadsh代码；
更好的做法是把loadsh抽离出来独立打包，这样也能有效利用缓存，因为这种库一般项目内都不会怎么更新，每次发版后依旧能使用之前的缓存。

<center>
    <img style="border-radius: 0.3125em;
    box-shadow: 0 2px 4px 0 rgba(34,36,38,.12),0 2px 10px 0 rgba(34,36,38,.08);" 
    src="md-imgs/image.png">
    <br>
    <div style="color:orange; border-bottom: 1px solid #d9d9d9;
    display: inline-block;
    color: #999;
    padding: 2px;">这里输入题注</div>
</center>

## 前置
### webpack5中默认的分包策略
```js
    // 将依赖模块（可以是npm包或者自己写的模块）分离出来作为单独的chunk
    splitChunks: {
        // async 针对异步加载的模块才进行分包
        chunks: 'async',
        //  将要被分离的模块，如果压缩前的体积小于xKB，那么不会被分离出来
        minSize: production ? 20000 : 1000,
        // 仅在剩余单个chunk时生效，避免分包后chunk体积过小，可以忽略，一般不手动配置
        minRemainingSize: development ? 0 : undefined,
        // 依赖模块被引用的次数>=1，才会被分离
        minChunks: 1,
        // 异步加载的最大并行请求数，如果>x，模块即便满足条件也不会被分离出来
        maxAsyncRequests: production ? 30 : Infinity,
        // 入口点的最大并行请求数，如果已经>x，模块即便满足条件也不会被分离出来
        maxInitialRequests: production ? 30 : Infinity,
        // 如果一个依赖的体积>xKB，将忽略minRemainingSize，maxAsyncRequests，maxInitialRequests配置，强制分离
        enforceSizeThreshold: production 50000 : 30000,
        // 被分离出的新chunk的命名连接符
        automaticNameDelimiter: "-",
        // 真正分离出chunk都是按照缓存组配置来的，按照优先级，如果一个模块满足缓存组的条件，那它将被划分到这个缓存组产生的chunk中
        cacheGroups: {
            defaultVendors: {
                idHint: "vendors",
                test: /[\\/]node_modules[\\/]/,
                priority: -10,
                reuseExistingChunk: true,
            },
            default: {
                idHint: "",
                minChunks: 2,
                priority: -20,
                reuseExistingChunk: true,
            },
        },
    },
```
以上配置描述了依赖的模块应该满足哪些规则才能被真正分离出去

>注意：webpack中的按需加载语法 **import()** 本来就会被单独作为一个chunk打包；这个分包的行为和splitChunks整个配置没有一毛钱关系
## splitChunks.cacheGroups
> 缓存组，分包的重要依据，如果依赖模块命中某个缓存组的匹配规则(test)，并满足splitChunks.minSize, splitChunks.minChunks, splitChunks.chunks等条件（在缓存组中能重写覆盖这些值），那模块就会被加入到这个缓存组中，一个缓存组中可能存放着一个或多个依赖模块，最后这个缓存组将单独作为一个chunk，这些模块都被包含在这个chunk中；当然如果某个缓存组没有任何模块命中，最后的打包结果中不会单独生成chunk
> 
> 大白话来讲: 缓存组可以看成一个个待招生的班级，它有明确的规则该班级招收怎样的学生（依赖模块），依赖模块(学生)如果满足该班级（缓存组）的招生条件，那就被划分到班级中，最后的结果就是招到了学生的班级开课（单独作为chunk打包）
### cacheGroups.test
>匹配模块的路径，比如只能是node_modules里的模块: 
>test: /[\\/]node_modules[\\/]/
> 如果不配置，那么将匹配所有模块
### cacheGroups.priority
> 一个模块可能满足多个缓存组的条件，这时候使用哪个缓存组取决于priority的大小
> 
> 大白话：priority代表班级教学水平的高低，值越大教学水平越高，现在你满足两个或多个班级（缓存组）的招生条件，但你最终去哪呢？肯定是去教学水平好的呀（priority大的）
## splitChunks.chunks
> chunks有三种配置，分别为：all / async / initial

### async
#### case1.1
入口文件的配置：
```js
// page1
import _ from 'loadsh';

const person = { name: 'ccc', age: 18, look: 'handsome', height: 'normal' };
const perfectPerson = _.omit(person, 'height');
console.log('😎😎😎 ~ perfectPerson:', perfectPerson);

// 异步导入jquery
import('jquery').then(Module => {
    const $ = Module.default;
    $('#main').css({ color: '#f40' });
});

// page2
import _ from 'loadsh';
// 同步导入jquery
import $ from 'jquery';

const str = 'abc';

const newStr = _.pad(str, 5, '_');
console.log('newStr', newStr);

$('#main').css({ color: '#ccc' });
```

page1异步导入jquery，page2同步引入jquery

webpack splitChunks使用默认配置

分包结果如下：

page1中的jquery被分离出来了，但是page2中同步引入的jquery依然在整个打包结果中；
chunks可以理解为一个限制条件，async表示分包的策略只对异步加在的chunk适用，其余chunk不满足条件，不会走分包策略

![Alt text](md-imgs/image-2.png)
#### case1.2
入口文件配置：
```js
// page1
import _ from 'loadsh';

const person = { name: 'ccc', age: 18, look: 'handsome', height: 'normal' };
const perfectPerson = _.omit(person, 'height');
console.log('😎😎😎 ~ perfectPerson:', perfectPerson);

// 异步导入jquery
import('jquery').then(Module => {
    const $ = Module.default;
    $('#main').css({ color: '#f40' });
});

// page2
import _ from 'loadsh';
const str = 'abc';

const newStr = _.pad(str, 5, '_');
console.log('newStr', newStr);

// 异步导入jquery
import('jquery').then(Module => {
    const $ = Module.default;
    $('#main').css({ color: '#ccc' });
});
```

page1异步导入jquery，page2异步引入jquery

webpack splitChunks使用默认配置

分包结果如下：

![Alt text](md-imgs/image-3.png)

> 注意，以上两个例子中**分包策略根本还未使用**，那为什么query单独作为一个chunk被分离出来了呢？那是因为import()导致的，webpack中本来就会为import()动态加载导入的包单独形成一个chunk

#### case2.1
入口文件配置：

```js
// page1
import _ from 'loadsh';

const person = { name: 'ccc', age: 18, look: 'handsome', height: 'normal' };
const perfectPerson = _.omit(person, 'height');
console.log('😎😎😎 ~ perfectPerson:', perfectPerson);

// 异步导入moment
import('moment').then(Module => {
    const moment = Module.default;
    const date = moment().format('dddd');
});

// 异步导入jquery
import('jquery').then(Module => {
    const $ = Module.default;
    $('#main').css({ color: '#f40' });
});

// page2
import _ from 'loadsh';
const str = 'abc';

const newStr = _.pad(str, 5, '_');
console.log('newStr', newStr);

// 异步导入moment
import('moment').then(Module => {
    const moment = Module.default;
    const date = moment().format('MMMM Do YYYY, h:mm:ss a');
});


// 异步导入jquery
import('jquery').then(Module => {
    const $ = Module.default;
    $('#main').css({ color: '#f40' });
});
```

page1异步导入jquery/moment，page2异步引入jquery/moment