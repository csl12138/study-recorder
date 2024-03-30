const { Compilation } = require('webpack');

const ConcatSource = require('webpack-sources').ConcatSource;

class TestPlugin {
    apply(compiler) {
        compiler.hooks.compilation.tap('TestPlugin', (compilation) => {
            compilation.hooks.processAssets.tap(
            {
                name: 'TestPlugin',
                stage: Compilation.PROCESS_ASSETS_STAGE_ADDITIONS,
            },
            (assets) => {
                Object.entries(assets).forEach(([pathname, source]) => {
                    console.log('😎😎😎 ~ TestPlugin ~ Object.entries ~ pathname:', pathname);
                    // assets[pathname] = new ConcatSource(
                    //     '/**怎么样？啊？我牛？我抽你两个大嘴巴子！**/',
                    //     '\n',
                    //     // assets[pathname],
                    // );
                });
            }
            );
        });
    }    
}

module.exports = TestPlugin;
