module.exports = {
    '*.{js,jsx}': ['prettier --write', 'eslint', 'git add'],
    '*.{css,less,json,md,html}': ['prettier --write', 'git add']
};
