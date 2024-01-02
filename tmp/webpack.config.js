const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const path = require('path');

const config = {
    mode: 'development',
    // mode: 'production',
    devtool: false,
    entry: {
        page1: './src/PageA',
        // page2: './src/PageB',
    },
    output: {
        clean: true,
        // 最终打包结果输出到当前目录的dist文件下
        path: __dirname + '/dist',
        filename: '[name]-[chunkhash:5].js',
        chunkFilename: 'chunk/[name]-[chunkhash:10].js',
    },
    watch: true,
    watchOptions: {
        ignored: /node_modules/,
        aggregateTimeout: 800, // 当文件修改，重新构建前，延迟800ms，这期间其他更改的构建都会被聚合到一次构建
    },
    module: {
        rules: [
            // 使用style-loader
            {
                test: /.css$/,
                use: ['style-loader', {
                    loader: 'css-loader',
                    options: {
                        modules: { localIdentName: '[local]-[hash:base64:5]' }
                    }
                }],
            },
            // 使用minicss插件
            // {
            //     test: /.css$/,
            //     use: [MiniCssExtractPlugin.loader, {
            //         loader: 'css-loader',
            //         options: {
            //             modules: { localIdentName: '[local]-[hash:base64:5]' }
            //         }
            //     }],
            // }
        ]
    },
    // 优化相关配置项
    optimization: {
        splitChunks: {
            cacheGroups: {
                defaultVendors: {
                    name: 'lib',
                    idHint: "vendors",
                    test: /[\\/]node_modules[\\/]/,
                    priority: -10,
                    reuseExistingChunk: true,
                },
                default: false,
            },
            chunks: 'initial'
        }
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './public/index.html',
            inject: 'body', // js文件放在<body>
            chunks: ['page1'], // 你要把哪些chunk打包后的资源加到html中
            filename: 'page1.html',
        }),
        // new HtmlWebpackPlugin({
        //     template: './public/index.html',
        //     inject: 'body', // js文件放在<body>
        //     chunks: ['page2'], // 你要把哪些chunk打包后的资源加到html中
        //     filename: 'page2.html',
        // }),
    ]
};

if (process.env.ANALYZER) {
    config.plugins.push(new BundleAnalyzerPlugin());
}

module.exports = config;
