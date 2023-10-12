// 异步导入loadsh
import('loadsh').then(Module => {
    const _ = Module.default;
    const str = 'abc';
    const newStr = _.pad(str, 5, '_');
    console.log('newStr', newStr);
});


// 异步导入jquery
import('jquery').then(Module => {
    const $ = Module.default;
    $('#main').css({ color: '#f40' });
});
