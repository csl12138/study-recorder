// 说白了就是把资源注释打开，再把空的占位注释掉
import fs from 'fs/promises';
import path from 'path';

const CWD = process.cwd();
const FILE_NAME = 'entries';
const ENTRY_PATH = path.resolve(CWD, FILE_NAME);
const CLIENT_PATH = path.join(ENTRY_PATH, 'client');
const SERVER_PAGES_PATH = path.join(CWD, 'server/renderer/server.page.js');

function _transform(content, pageName) {
    const contentArr = content.split('\n');
    const assetsStrIdx = contentArr.findIndex((item) => item.includes(`// ${pageName}-real-assets`));
    const placeholderStrIdx = contentArr.findIndex((item) => item.includes(`// ${pageName}-placeholder`));
    assetsStrIdx !== -1 && (contentArr[assetsStrIdx] = contentArr[assetsStrIdx].replace(/\/\//, ''));
    placeholderStrIdx !== -1 && (contentArr[placeholderStrIdx] = `// ${contentArr[placeholderStrIdx]}`);
    return contentArr.join('\n');
}

module.exports = async function(pageName) {
    // client 和 server 都需要改
    const clientBuffer = await fs.readFile(path.resolve(CLIENT_PATH, `${pageName}.js`));
    const serverBuffer = await fs.readFile(path.resolve(SERVER_PAGES_PATH));
    const newClientEntry = _transform(clientBuffer.toString(), pageName);
    const newServerPage = _transform(serverBuffer.toString(), pageName);
    fs.writeFile(path.join(CLIENT_PATH, `${pageName}.js`), newClientEntry);
    fs.writeFile(SERVER_PAGES_PATH, newServerPage);
};
