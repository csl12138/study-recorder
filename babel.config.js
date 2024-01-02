module.exports = {
    presets: [
        ['@babel/preset-env', {
            useBuiltIns: 'usage',
            corejs: 2,
        }], // babel预设
        ['@babel/preset-react', {
            runtime: 'automatic', // 自动导入jsx转换函数
        }], // jsx转换
    ],
    plugins: ['@babel/plugin-transform-runtime'],
};
