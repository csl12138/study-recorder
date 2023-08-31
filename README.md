# 学习笔记-webpack打包css

## css-loader
css modules:
```js
{
    loader: 'css-loader',
    options: {
        modules: {
            /**
             * path: 当前css文件的路径
             * name: 引入的模块名
             * local: 本身的类名
             * hash: 独一无二的hash值（记得好像是前面几种加起来计算的）
            */
           localIdentName: [local]-[hash:base64:5] 
        }
    }
}
```
在css modules 中定义一个全局的类名
```css
:global(.globalClass) {
    font-size: 20px;
}
```
css modules也提供**混合类名**、**定义变量**等功能，不过项目中大多是和sass/less一起使用，不会单独用到，所以不做记录


## style-loader
在最终bundle.js代码中，它会动态的创建`<style/>`插入css
### 在style-loader下样式是如何生效的？

- 场景一：同步引入
在入口文件中通过`import 'xxx.css'`或者`import style from 'xxx.css'`
首先明确因为是同步引入，所以会被编译到主chunk中，在递归入口文件依赖的过程中，发现有.css文件，交给css相关的loader处理。
最后打包结果中css模块代码如下：
```js
/***/ "./src/PageA/index.css":
/*!*****************************!*\
  !*** ./src/PageA/index.css ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_0_use_1_index_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[0].use[1]!./index.css */ "./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[0].use[1]!./src/PageA/index.css");


var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_0_use_1_index_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);


       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_0_use_1_index_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_0_use_1_index_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_0_use_1_index_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);

/***/ }),
```
这个代码一眼望去就可以省略成`document.head.appendChild(<style>xxxxx</style>)`；因为其他模块的引用，当执行到这里时，就会动态地往head中添加style元素，那css样式自然就被引入了。

- 场景二：异步引入
比如通过：
```js
const css = await import(/* webpackChunkName: "async.css" */ './async.css');
div.classList.add(css.default.async);
```
异步的导入在最终的打包结果中都会单独一个chunk，所以打包结果中会多出一个`async.css.js`，(注意这里是**js**文件，因为style-loader并不会生成css文件，它只是一段js脚本，在脚本执行时帮你把css源码插入到文档中；如果是用的`minicss.loader`结果会不会不一样呢？)文件的内容和场景一一样，当我们动态引人这个模块时，执行类似的伪代码`document.head.appendChild(<style>xxxxx</style>)`；样式被插入到`<head></head>`中

- 场景三：异步的js中引入异步的css
```js
// main.js
import(/* webpackChunkName: "async.js" */ './async.js')
    .then(module => console.log('module', module));

// async.js
export const flag = 'async';
console.log('async js');
import(/* webpackChunkName: "async.css" */ './async.css')
    .then(css => console.log('async css', css));

```
会不会生成独立的async.js.js?   --- 会
会不会生成独立的async.css.js？ --- 会
先加载请求异步chunk async.js，执行async.js过程中发现还有异步的async.css，再发起请求，然后后续的生效流程就和场景二一样

- 场景四：异步的js中引入同步的css
```js
// main.js
import(/* webpackChunkName: "async.js" */ './async.js')
    .then(module => console.log('module', module));

// async.js
import css from './async.css';
export const flag = 'async';
console.log('async js');
console.log('css', css);
```
会不会生成独立的async.js.js?   --- 会
会不会生成独立的async.css.js？ --- 不会

## mini-css-extract-plugin
为css生成单独的文件而不是动态inline在`<head></head>`中输出

### plugin参数
```js
{
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name]-[contenthash].css',
            chunkFilename: 'name]-[contenthash].css'
        });
    ]
}
```
### loader参数
```js
{
    loader: MiniCssExtractPlugin.loader
    options: {
        publicPath: '/', // 这个和webpack.output中的含义一样
        hmr: process.env.NODE_ENV === 'development', // 开发环境启用热更新
        reloadAll: true, // 热更新失效时重新加载全部样式
        esModule: false, // css文件生成的js模块用es6语法还是cmjs语法（这个无所谓，反正两种模块化语法最终都会被webpack统一）
    }
}
```

### 浅显地分析原理
1. 同步引入css：插件会对每个chunk打包后的js文件中的css都提取出来形成单独的.css文件，但要怎么使用这些css却不是固定的，插件并不会帮你自动引用；一般项目中都有`html-webpack-plugin`，它会自动把chunk最终的资源文件加入到html模板中；当然你也可以用各种插件获取打包后的文件，选择手动插入css的`<link>`标签
2. 异步引人css：通常发生在异步引入一个组件，那这个组件里的用到的样式也会被以css文件的形式异步引入；具体是通过往__webpack_require__.f（ensureChunkHandler）上加一个`.miniCss`方法实现的，这样使用webpack`import()`语法时，会同时请求.js和.css
  

## Q & A
### style-loader是否只能用在dev环境?
> 一般只用在dev，生产上都是直接生成css文件，甚至dev也可以直接生成css文件，**MiniCssExtractPlugin.loader 和 style-loader不能共用**

### 【扩展】css/js对于浏览器渲染的影响
> 当浏览器拿到返回的HTML数据后，开始解析HTML，如果遇到外联的css文件，**不阻塞解析，并且异步下载**，但是DOM的渲染需要等到css下载并执行完，所以**会阻塞渲染**；css文件的下载和js文件的下载是并行的，但在css下载并执行完毕前，后面的js不会执行，**所以css会阻塞js的执行**；关于js文件，正常普通的外联JS文件，从下载js开始，html就暂停了解析，等到js下载并执行完毕，才继续解析html，所以**js会阻塞html解析，也会阻塞页面渲染**。
参考文章: 
1、https://juejin.cn/post/7083744760048910366#heading-14
2、https://juejin.cn/post/7077347573740077069

### webpack中的placeholder命名规则
> - [ext] 处理文件的后缀
> - [name] 处理文件的名称
> - [hash] 每次构建产生的hash，和整个项目有关，只要项目文件有更改，就会改变hash
> - [contenthash] 和单个文件的内容有关，文件内容发生变化才变化
> - [chunkhash] 和webpack打包生成的chunk有关，每个chunk都有不同的hash
> - [id] chunkId

### 如何区分webpack配置中的chunkFilename 和 filename
> 在entry依赖中同步引入的chunk需要输出文件，文件的名称就按filename来；
> 如果是异步chunk输出的文件，文件名称那就按chunkFilename来
> 参考：https://blog.csdn.net/yexudengzhidao/article/details/123331759

### 关于html-webpack-plugin
> 1. html中不想引人某个chunk打包后的资源文件，修改`chunks`配置
> 2. 想创建多个html模板，多次使用new HtmlWebpackPlugin();
