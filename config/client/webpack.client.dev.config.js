const webpack = require('webpack');
const { merge } = require('webpack-merge');
const WebpackBarPlugin = require('webpackbar');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const AssetsPlugin = require('assets-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const path = require('path');
const baseConfig = require('../webpack.base.config');
const babelConfig = require('./babel.config');
// const TestEntryPlugin = require('../plugins/TestEntryPlugin');

const CWD = process.cwd();

const config = {
    mode: 'development',
    devtool: 'eval',
    entry: {
        page1: ['webpack-hot-middleware/client', path.resolve(__dirname, '../../entries/client/page1')],
    },
    watch: false,
    watchOptions: {
        ignored: ['**/dist/**', '**/node_modules', '**/package.json', '**/package-lock.json', '**/server/**'],
    },
    output: {
        // 最终打包结果输出到项目根目录的dist文件下
        path: path.resolve(CWD, 'dist'),
        filename: 'js/[name].bundle.js', // 不需要clean了，因为这里没有hash
        chunkFilename: 'js/[name].chunk.js',
        publicPath: '/',
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
                use: [MiniCssExtractPlugin.loader, {
                    loader: 'css-loader',
                    options: {
                        modules: { localIdentName: '[local]-[hash:base64:5]' }
                    }
                }],
            }
        ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new ReactRefreshWebpackPlugin(),
        new WebpackBarPlugin({ name: 'client' }),
        new AssetsPlugin({ filename: './dist/assets.json', entrypoints: true }), // keepInMemory和dev-middleware一起用会报错
        new MiniCssExtractPlugin({
            filename: 'css/[name].css',
            chunkFilename: 'css/[name].css'
        }),
        // new TestEntryPlugin(),
    ],
};

if (process.env.ANALYZER) {
    config.plugins.push(new BundleAnalyzerPlugin());
}

module.exports = merge(baseConfig, config);
