module.exports = {
    presets: [
        ['@babel/preset-env', {
            useBuiltIns: false,
            modules: 'cjs',
        }], // babel预设
        ['@babel/preset-react', {
            runtime: 'automatic', // 自动导入jsx转换函数
        }], // jsx转换
    ],
    comments: false,
    plugins: [['@babel/plugin-transform-runtime', {
        corejs: false,
    }]],
};
