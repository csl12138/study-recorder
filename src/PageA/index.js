import sync from './sync';
import css from './index.css';
console.log(css, sync);

function changePublish(p) {
    p && (__webpack_require__.p = p);
};

window.__changePublish = changePublish;

const div = document.getElementById('main');
div.onclick = async () => {
    // window.__changePublish('https://static.pddpic.com');
    const module = await import(/* webpackChunkName: "async.js" */ './async.js');
    console.log('😎😎😎 ~ div.onclick= ~ module:', module);
    // const css = await import(/* webpackChunkName: "async.css" */ './async.css');
    // console.log('😎😎😎 ~ div.onclick= ~ css:', css);
    // div.classList.add(css.default.async);
}