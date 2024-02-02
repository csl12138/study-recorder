const fs = require('fs');
const path = require('path');
const pageConfig = require('../../config/page.config');
const pages = pageConfig.pages;
const CWD = process.cwd();
const FILE_NAME = 'entries';
const ENTRY_PATH = path.resolve(CWD, FILE_NAME);
const CLIENT_PATH = path.join(ENTRY_PATH, 'client');
const SERVER_PAGES_PATH = path.join(CWD, 'server/renderer/server.page.js');

const getClientWebpackEntry = () => {
    const entry = {};
    for (let i = 0; i < pages.length; i++) {
        const pageName = pages[i];
        entry[pageName] = ['webpack-hot-middleware/client', path.join(CLIENT_PATH, pageName)];
    }
    return entry;
};

const cleanEntryDir = () => {
    fs.rmdirSync(ENTRY_PATH, { recursive: true });
};

const buildEntryDir = () => {
    fs.mkdirSync(ENTRY_PATH);
};

const buildClientEntry = () => {
    fs.mkdirSync(CLIENT_PATH);
    for (let i = 0; i < pages.length; i++) {
        const pageName = pages[i];
        const str = `// import App from '@/${pageName}'; // ${pageName}-real-assets\nconst App = {}; // ${pageName}-placeholder\n` +
        `import { startClient } from '@/common/startClient';\nstartClient(App);`;
        fs.writeFileSync(path.join(CLIENT_PATH, `${pageName}.js`), str);
    }
};

const initServerPages = () => {
    let importContent = '';
    let exportObjectStr = '';
    for (let i = 0; i < pages.length; i++) {
        const pageName = pages[i];
        importContent += `// import ${pageName} from '@/${pageName}'; // ${pageName}-real-assets\nconst ${pageName} = {}; // ${pageName}-placeholder\n`;
        exportObjectStr += `${pageName},`;
    }
    const endStr = `export default { ${exportObjectStr} };`;
    fs.writeFileSync(SERVER_PAGES_PATH, importContent + endStr);
};


function init () {
    cleanEntryDir();
    buildEntryDir();
    buildClientEntry();
    initServerPages();
}

module.exports = {
    init,
    getClientWebpackEntry,
};
