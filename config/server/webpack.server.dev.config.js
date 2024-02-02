const { merge } = require('webpack-merge');
const WebpackBarPlugin = require('webpackbar');
const nodeExternal = require('webpack-node-externals');
const path = require('path');
const babelConfig = require('./babel.config');
const baseCOnfig = require('../webpack.base.config');
const CWD = process.cwd();


const config = {
    mode: 'development',
    // devtool: 'eval-cheap-module-source-map',
    target: 'node',
    externals: [nodeExternal()],
    watchOptions: {
        ignored: ['**/dist/**', '**/node_modules', '**/package.json', '**/package-lock.json', '**/server/!renderer'],
    },
    entry: {
        renderer: [path.resolve(__dirname, '../../server/renderer')],
    },
    output: {
        // 最终打包结果输出到项目根目录的dist/server文件下
        filename: 'server/renderer.js',
        path: path.resolve(CWD, 'dist'),
        libraryTarget: 'commonjs2',
    },
    module: {
        rules: [
            {
                test: /\.(js|ts|jsx|tsx)$/,
                exclude: /node_modules/,
                use: [{ loader: 'babel-loader', options: babelConfig }],
            },
            {
                test: /\.css$/,
                use: [{
                    loader: 'css-loader',
                    options: {
                        modules: {
                            localIdentName: '[local]-[hash:base64:5]',
                            exportOnlyLocals: true,
                        },
                    },
                }],
            }
        ],
    },
    plugins: [
        new WebpackBarPlugin({ name: 'server', color: 'blue' }),
    ],
};

module.exports = merge(baseCOnfig, config);
