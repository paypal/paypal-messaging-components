import { execSync } from 'child_process';
import collectDiffs from './collectDiffs';

export default async () => {
    global.devServer.close();

    if (process.env.RUNLOCAL !== '1') {
        execSync(`docker kill ${global.containerName}`);
        execSync(`docker rm ${global.containerName}`);
    }

    collectDiffs();
};
