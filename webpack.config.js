const path = require('path');

const config = {
    mode: 'development',
    devtool: false,
    entry: {
        babel: './src/test',
    },
    output: {
        clean: true,
        path: path.resolve(__dirname, 'dist-webpack'),
        filename: '[name]-[contenthash:5].js',
    },
    watch: true,
    watchOptions: {
        ignored: /node_modules/,
        aggregateTimeout: 800,
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                // loader: 'babel-loader',
                use: [ path.resolve(__dirname, './checkBabelSource.js'), 'babel-loader'],
            }
        ],
    },
    optimization: {
        // mode: development 如何开启tree shaking; mode: production && minimize: true 默认开启tree shaking
        usedExports: true, // 会为判断为dead code的代码片段打上标记
        // minimize: true, // 压缩打包后的代码，并且会删除打上标记的代码（不压缩可以注释）
    },
};

module.exports = config;
