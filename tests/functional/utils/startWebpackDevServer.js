import path from 'path';
import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import getWebpackConfig from '../../../webpack.config.dev';

export default async function startWebpackDevServer() {
    const webpackConfig = await getWebpackConfig(
        {
            mockImadserv: true,
            standalone: true
        },
        {}
    );

    const compiler = webpack(webpackConfig);

    const devServerConfig = webpackConfig.devServer;
    devServerConfig.contentBase = path.resolve(__dirname, '../content');

    global.devServer = new WebpackDevServer(compiler, webpackConfig.devServer);
    global.devServer.listen(8080, '127.0.0.1', () => {
        console.log('Dev server started at http://127.0.0.1:8080');
    });

    await new Promise(resolve => {
        compiler.hooks.done.tap('Wait for compile', resolve);
    });
    devServerConfig.open = false;
    devServerConfig.watchContentBase = false;
}
