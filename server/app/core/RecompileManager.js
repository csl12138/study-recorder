// 正常的SSR流程是，先client端build完，然后server端build并引入最新的client.bundle，重新运行server端代码
// 保证server和client都打包完毕
import path from 'path';

const DIST_PATH = path.resolve(process.cwd(), './dist');

class RecompileManager {
    constructor(clientComplier, serverComplier) {
        this.clientComplier = clientComplier;
        this.serverComplier = serverComplier;

        this.compilePromise = null;
        this.compileReady = null;
        this._compileCounter = 0; // 代理属性
        this.assets = { dirty: true }; // 资源清单
        // 按需编译相关
        this.lazyCompiledPages = {};
        this.currentLazyPage = '';
        this.whenLazyCompileStart = null;
        this.isLazyCompileStarting = false;
        this.registerHooks();
    }
    get compileCounter() {
        return this._compileCounter;
    }
    set compileCounter(value) {
        this._compileCounter = value;
        if (value === 0 && this.compilePromise) {
            this.ready();
            return;
        }
        if (!this.compilePromise) {
            this.generateCompilePromise();
        }
    }
    registerHooks() {
        this.clientComplier?.hooks.compile.tap('clientCompile', () => {
            console.log('=========== 客户端开始编译 ===========');
            this.compileCounter += 1;
            if (this.isLazyCompileStarting) {
                typeof this.whenLazyCompileStart === 'function' && this.whenLazyCompileStart();
                this.whenLazyCompileStart = null;
            }
        });
        this.clientComplier?.hooks.done.tap('clientDone', () => {
            console.log('=========== 客户端构建完成 ===========');
            this.compileCounter -= 1;
            if (this.assets.dirty) {
                this.getAssets();
            }
        });
          
        this.serverComplier?.hooks.compile.tap('serverCompile', () => {
            console.log('=========== 服务端开始编译 ===========');
            this.compileCounter += 1;
            if (this.isLazyCompileStarting) {
                typeof this.whenLazyCompileStart === 'function' && this.whenLazyCompileStart();
                this.whenLazyCompileStart = null;
            }
        });
        this.serverComplier?.hooks.done.tap('serverDone', () => {
            console.log('=========== 服务端构建完成 ===========');
            this.compileCounter -= 1;
        });
    }
    // 获取资源清单
    getAssets() {
        try {
            const assetsPath = path.resolve(DIST_PATH, './assets.json');
            delete require.cache[require.resolve(assetsPath)];
            this.assets = require(assetsPath);
        } catch (err) {
            console.log('获取资源清单失败 : ', err);
        }
    }
    resetCompilePromise() {
        this.compilePromise = null;
        this.compileReady = null;
    }
    generateCompilePromise() {
        this.compilePromise = new Promise(resolve => this.compileReady = resolve);
    }
    waitCompile() {
        if (!this.compilePromise) return Promise.resolve();
        return this.compilePromise;
    }
    ready() {
        if (this.isLazyCompileStarting) {
            this.currentLazyPage && (this.lazyCompiledPages[this.currentLazyPage] = true);
            this.isLazyCompileStarting = false;
            this.currentLazyPage = '';
        }
        this.compileReady();
        this.resetCompilePromise();
        // 顺便帮忙把缓存清了
        delete require.cache[require.resolve(path.resolve(DIST_PATH, this.serverComplier.options.output.filename))];
    }
    checkLazyPages(page) {
        return !this.lazyCompiledPages[page];
    }
    willStartLazyRecompile(page, whenLazyCompileStart) {
        this.currentLazyPage = page;
        this.whenLazyCompileStart = whenLazyCompileStart;
        this.isLazyCompileStarting = true;
    }
};

export default RecompileManager;
