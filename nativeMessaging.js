#!/usr/local/bin/node
const { createWebpackBundle } = require('./webpack');

async function sendResponse(json) {
    const jsonBuffer = Buffer.from(JSON.stringify(json));

    const header = Buffer.alloc(4);
    header.writeUInt32LE(jsonBuffer.length, 0);

    process.stdout.write(header);
    process.stdout.write(jsonBuffer);
}

async function handleMessage(payload) {
    const { type, target } = payload;
    if (type === 'injection') {
        let bundle = null;
        try {
            bundle = await createWebpackBundle({ target });
        } catch (err) {
            const response = { status: 'failure' };

            await sendResponse(response);
            return;
        }

        const response = { file: bundle, status: 'success' };

        await sendResponse(response);
    }
}

process.stdin.on('readable', async () => {
    let input = [];
    let chunk;
    // eslint-disable-next-line no-cond-assign
    while ((chunk = process.stdin.read())) {
        input.push(chunk);
    }
    input = Buffer.concat(input);
    const msgLen = input.readUInt32LE(0);
    const dataLen = msgLen + 4;
    if (input.length >= dataLen) {
        const content = input.slice(4, dataLen);
        const json = content.toString();
        await handleMessage(JSON.parse(json));
    }
});
