import sync from './sync';
import css from './index.css';
console.log(css, sync);



const div = document.getElementById('main');
div.onclick = async () => {
    const module = await import(/* webpackChunkName: "async.js" */ './async.js');
    console.log('😎😎😎 ~ div.onclick= ~ module:', module);
    // const css = await import(/* webpackChunkName: "async.css" */ './async.css');
    // console.log('😎😎😎 ~ div.onclick= ~ css:', css);
    // div.classList.add(css.default.async);
}