export function serializeAssets(allAssets, pageName) {
    const result = { js: [], css: [] };
    if (!allAssets || !pageName) return result;
    const curAssets = allAssets[pageName] || {};
    result.js = result.js.concat(curAssets.js || []);
    result.css = result.css.concat(curAssets.css || []);
    return result;
}
