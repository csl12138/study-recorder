const path = require('path');

const config = {
    // watch: true,
    // watchOptions: {
    //     ignored: ['**/dist/**', '**/node_modules', '**/package.json', '**/package-lock.json'],
    //     // aggregateTimeout: 800, // 当文件修改，重新构建前，延迟800ms，这期间其他更改的构建都会被聚合到一次构建
    // },
    resolve: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
        alias: {
            '@': path.resolve(__dirname, '../src'),
        },
    },
    // module: {
    //     rules: [
    //         {
    //             test: /\.(js|ts|jsx|tsx)$/,
    //             exclude: /node_modules/,
    //             use: 'babel-loader',
    //         },
    //     ]
    // },
};

module.exports = config;
