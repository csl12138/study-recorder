import express from 'express';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import path from 'path';
import RecompileManager from './core/RecompileManager';
import { serializeAssets } from './utils';

const CONFIG_PATH = path.resolve(process.cwd(), './config');
const DIST_PATH = path.resolve(process.cwd(), './dist');

const app = express();

// webpack打包相关
const clientConfig = require(path.resolve(CONFIG_PATH, './client/webpack.client.dev.config.js'));
const serverConfig = require(path.resolve(CONFIG_PATH, './server/webpack.server.dev.config.js'));
const clientComplier = webpack(clientConfig);
const serverComplier = webpack(serverConfig);

const clientDevInstance = webpackDevMiddleware(clientComplier, { serverSideRender: true, index: false });
const serverDevInstance = webpackDevMiddleware(serverComplier, { writeToDisk: true });

const recompileManager = new RecompileManager(clientComplier, serverComplier, clientDevInstance, serverDevInstance);

app.use(clientDevInstance).use(webpackHotMiddleware(clientComplier));
app.use(serverDevInstance);

app.get('/:page.html', async(req, res) => {
  await recompileManager.waitCompile();
  const module = require(path.resolve(DIST_PATH, serverConfig.output.filename));
  const render = module.default;
  console.log('assets.json', recompileManager.assets);
  res.send(render({
    assets: serializeAssets(recompileManager.assets, req.params?.page),
  }));
});

app.listen(9527, () => {
    console.log('server is listening on 9527');
});
