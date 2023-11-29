const obj = {name: 'cccc'};
function test() { console.log(this.name) }
obj::test();
