// 需要webpack打包的渲染器
import { StrictMode, isValidElement } from 'react';
import { renderToString } from 'react-dom/server';
import pages from './server.page';
// const pages = {};

// 给数据，返回html字符串
function render({ assets = {} }) {
    const RootComponent = () => {
        console.log('pages === ', pages);
        const App = pages.page1;
        return (
            <StrictMode>
                {isValidElement(App) ? App : <App />}
            </StrictMode>
        );
    };

    const RootComponentStr = renderToString(RootComponent());

    // 需要塞进模板中的资源
    const css = assets.css.map(item => `<link rel="stylesheet" href=${item}>`);
    const js = assets.js.map(item => `<script src=${item}></script>`);

    const html = `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8">
        ${css}
        <title>React SSR</title>
      </head>
      <body>
        <div id="root">${RootComponentStr}</div>
        ${js}
      </body>
    </html>
    `;
    return html;
};

export default render;
