module.exports = {
    branch: 'release',
    plugins: [
        [
            '@semantic-release/commit-analyzer',
            {
                preset: 'angular',
                // Defaults: https://github.com/semantic-release/commit-analyzer/blob/master/lib/default-release-rules.js
                releaseRules: [{ type: 'refactor', release: 'patch' }]
            }
        ],
        '@semantic-release/release-notes-generator',
        [
            '@semantic-release/changelog',
            {
                changelogTitle: '# Changelog'
            }
        ],
        [
            '@semantic-release/npm',
            {
                npmPublish: false
            }
        ],
        [
            '@semantic-release/exec',
            {
                prepareCmd: './scripts/semantic-release/assets.sh ${nextRelease.version}',
                successCmd: './scripts/semantic-release/merge.sh ${options.repositoryUrl}'
            }
        ],
        [
            '@semantic-release/git',
            {
                assets: ['package.json', 'dist', 'CHANGELOG.md'],
                message: 'chore(release): ${nextRelease.version} [skip ci]\n\n${nextRelease.notes}'
            }
        ],
        [
            '@semantic-release/github',
            {
                assets: 'dist/*'
            }
        ]
    ]
};
