module.exports = {
    process(src) {
        return {
            code: `module.exports = { _getCss: () => ${JSON.stringify(src)} };`
        };
    }
};
