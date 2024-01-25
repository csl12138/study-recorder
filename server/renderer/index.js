// 需要webpack打包的渲染器
import { StrictMode } from 'react';
import { renderToString } from 'react-dom/server';
// 如果是按需编译不应该直接导入，应该通过中间变量获取
import pages from "../../entries/server.page.entry";

// 给数据，返回html字符串
function render({ assets = {} }) {

    const RootComponent = () => {
        const App = pages.page1;
        return (
            <StrictMode>
                <App />
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
