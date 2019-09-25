import collectDiffs from './collectDiffs';

export default async () => {
    global.devServer.close();
    collectDiffs();
};
