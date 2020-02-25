module.exports = {
    process(src) {
        return `module.exports = { _getCss: () => ${JSON.stringify(src)} };`;
    }
};
