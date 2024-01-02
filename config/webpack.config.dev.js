const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const path = require('path');

const config = {
    mode: 'development',
    // devtool: 'eval-source-map',
    // devtool: 'eval',
    devtool: 'source-map',
    entry: {
        app: path.resolve(__dirname, '../src/index'),
    },
    output: {
        clean: true,
        // 最终打包结果输出到项目根目录的dist文件下
        path: path.resolve(__dirname, '../dist'),
        filename: '[name]-[chunkhash:5].js',
        chunkFilename: 'chunk/[name]-[chunkhash:10].js',
    },
    // watch: true,
    watchOptions: {
        ignored: /node_modules/,
        aggregateTimeout: 800, // 当文件修改，重新构建前，延迟800ms，这期间其他更改的构建都会被聚合到一次构建
    },
    resolve: {
        extensions: ['.js', '.jsx', 'ts', '.tsx'],
    },
    module: {
        rules: [
            {
                test: /\.(js|ts|jsx|tsx)$/,
                exclude: /node_modules/,
                use: 'babel-loader',
            },
            // 使用style-loader
            {
                test: /\.css$/,
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
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, '../public/index.html'),
            inject: 'body', // js文件放在<body>
            chunks: ['app'], // 你要把哪些chunk打包后的资源加到html中
            filename: 'index.html',
        }),
    ],
    devServer: {
        historyApiFallback: true,
        port: 8000,
        host: "localhost", //设置host
        hot: true,
        open: true,
        compress: true,
    },
};

if (process.env.ANALYZER) {
    config.plugins.push(new BundleAnalyzerPlugin());
}

module.exports = config;
