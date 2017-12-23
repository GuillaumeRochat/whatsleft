const express = require('express'); // eslint-disable-line
const webpackDevMiddleware = require('webpack-dev-middleware'); // eslint-disable-line
const webpack = require('webpack'); // eslint-disable-line
const webpackConfig = require('./webpack.config.js');

const app = express();

const compiler = webpack(webpackConfig);

app.use(webpackDevMiddleware(compiler, {
    hot: false,
    filename: 'bundle.js',
    publicPath: '/',
    stats: { colors: true },
    historyApiFallback: false,
}));

app.use(express.static(`${__dirname}/public`));

const server = app.listen(3000, () => {
    const host = server.address().address;
    const port = server.address().port;
    console.log('Example app listening at http://%s:%s', host, port);
});
