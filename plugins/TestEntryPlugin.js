class TestEntryPlugin {
    apply(compiler) {
        compiler.hooks.entryOption.tap('TestEntryPlugin', (context, entry) => {
            console.log('😎😎😎 ~ TestEntryPlugin ~ compiler.hooks.entryOption.tap ~ entry:', entry);
        });
    }
}

module.exports = TestEntryPlugin;
