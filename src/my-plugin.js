module.exports = function () {
    return {
        visitor: {
            CallExpression(path) {
                const node = path.node;
                const bindExpression = node.callee
                if (bindExpression.type !== 'BindExpression') {
                    return;
                }
                const bindContext = bindExpression.object.name;
                const funcName = bindExpression.callee.name;
                const replacement = `${funcName}.call(${bindContext})`; // test.call(obj)
                path.replaceWithSourceString(replacement);
            }
        }
    }
}