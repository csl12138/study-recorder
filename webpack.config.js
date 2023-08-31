const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// const { RetryChunkLoadPlugin } = require('webpack-retry-chunk-load-plugin');

module.exports = {
    mode: 'development',
    // mode: 'production',
    devtool: false,
    entry: './src/PageA',
    watch: true,
    watchOptions: {
        ignored: /node_modules/,
        aggregateTimeout: 800, // 当文件修改，重新构建前，延迟800ms，这期间其他更改的构建都会被聚合到一次构建
    },
    module: {
        rules: [
            // 使用style-loader
            // {
            //     test: /.css$/,
            //     use: ['style-loader', {
            //         loader: 'css-loader',
            //         options: {
            //             modules: { localIdentName: '[local]-[hash:base64:5]' }
            //         }
            //     }],
            // },
            // 使用minicss插件
            {
                test: /.css$/,
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
        new HtmlWebpackPlugin({
            template: './public/index.html',
            inject: 'body', // js文件放在<body>
            chunks: 'all', // 你要把哪些chunk打包后的资源加到html中
        }),
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin(),
        // new RetryChunkLoadPlugin({
        //     cacheBust: `function() {
        //         return Date.now();
        //       }`, 
        //     retryDelay: 1000,
        //     maxRetries: 3,
        // }),
    ]
}