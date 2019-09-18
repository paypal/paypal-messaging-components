import path from 'path';
import { exec, execSync } from 'child_process';
import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import getWebpackConfig from '../../../webpack.config.dev';

export default async function startWebpackDevServer() {
    if (process.env.RUNLOCAL !== '1') {
        global.containerName = `chromium_messagingjs`;

        const existingContainers = execSync(`docker ps -a -f "name=${global.containerName}"`)
            .toString()
            .split('\n');

        if (existingContainers.length === 3) {
            const containerRow = existingContainers[1];
            if (containerRow.includes('Exited')) {
                execSync(`docker start ${global.containerName}`);
                console.log('Starting existing docker container');
            } else {
                console.log('Docker container already found running');
            }
        } else {
            console.log('Creating docker container');
            await new Promise((resolve, reject) => {
                exec(
                    `docker run -d --restart on-failure:5 -p 9222:9222 --name ${global.containerName} chromium`,
                    (err, stdout, stderr) => {
                        const error = err || stderr;
                        if (error) {
                            reject(error);
                        } else {
                            resolve();
                        }
                    }
                );
            });
        }
    }

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
    devServerConfig.public = 'host.docker.internal';

    global.devServer = new WebpackDevServer(compiler, webpackConfig.devServer);
    global.devServer.listen(8080, 'localhost.paypal.com', () => {
        console.log('Dev server started at http://localhost.paypal.com:8080');
    });

    await new Promise(resolve => {
        compiler.hooks.done.tap('Wait for compile', resolve);
    });
    devServerConfig.open = false;
    devServerConfig.watchContentBase = false;
}
