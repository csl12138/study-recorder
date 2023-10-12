// 异步导入loadsh
import('loadsh').then(Module => {
    const _ = Module.default;
    const person = { name: 'ccc', age: 18, look: 'handsome', height: 'normal' };
    const perfectPerson = _.omit(person, 'height');
    console.log('😎😎😎 ~ perfectPerson:', perfectPerson);
});

// 异步导入jquery
import('jquery').then(Module => {
    const $ = Module.default;
    $('#main').css({ color: '#f40' });
});

