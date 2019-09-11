module.exports = {
    branch: 'release',
    repositoryUrl: 'https://github.com/Seavenly/paypal-messaging-components',
    plugins: [
        '@semantic-release/commit-analyzer',
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
