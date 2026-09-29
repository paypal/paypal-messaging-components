#!/usr/bin/env node
/* eslint-disable no-console */

const { spawn } = require('child_process');
const http = require('http');

const PORT = 8080;
const DEV_SERVER_URL = `http://localhost:${PORT}/demo/standalone-v2-comparison.html`;
const WEBPACK_COMMAND = ['run', 'dev:standalone'];

const openUrl = url => {
    const commandByPlatform = {
        darwin: { command: 'open', args: [url] },
        win32: { command: 'cmd', args: ['/c', 'start', '', url] }
    };
    const opener = commandByPlatform[process.platform] ?? {
        command: 'xdg-open',
        args: [url]
    };

    const child = spawn(opener.command, opener.args, { detached: true, stdio: 'ignore' });
    child.on('error', error => {
        console.warn(`Could not open browser automatically: ${error.message}`);
    });
    child.unref();
};

const waitForServer = () => {
    return new Promise(resolve => {
        const checkServer = () => {
            const req = http
                .get(DEV_SERVER_URL, () => {
                    console.log(`\n✨ Opening v2 comparison page at ${DEV_SERVER_URL}\n`);
                    openUrl(DEV_SERVER_URL);
                    resolve();
                })
                .on('error', () => {
                    setTimeout(checkServer, 500);
                });
            req.end();
        };
        checkServer();
    });
};

console.log('Starting dev server for v2 comparison demo...');
const webpack = spawn('npm', WEBPACK_COMMAND, { stdio: 'inherit' });

waitForServer();

webpack.on('error', error => {
    console.error('Failed to start dev server:', error);
    process.exit(1);
});
