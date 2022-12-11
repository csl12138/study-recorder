module.exports = {
    mode: 'development',
    devtool: 'source-map',
    entry: './src/PageA',
    module: {
        rules: [
            {
                test: /.css$/,
                use: 'css-loader',
            }
        ]
    },
}