module.exports = {
    branch: 'release',
    plugins: [
        [
            '@semantic-release/commit-analyzer',
            {
                preset: 'conventionalcommits',
                // Defaults: https://github.com/semantic-release/commit-analyzer/blob/master/lib/default-release-rules.js
                releaseRules: [
                    { type: 'refactor', release: 'patch' },
                    { type: 'perf', release: 'patch' },
                    { type: 'style', release: 'patch' },
                    { type: 'revert', release: 'patch' }
                ]
            }
        ],
        [
            '@semantic-release/release-notes-generator',
            {
                preset: 'conventionalcommits',
                presetConfig: {
                    types: [
                        // What commit types show up in the changelog file
                        { type: 'feat', section: 'Features' },
                        { type: 'fix', section: 'Bug Fixes' },
                        { type: 'perf', section: 'Performance Improvements' },
                        { type: 'revert', section: 'Reverts' },
                        { type: 'docs', section: 'Documentation' },
                        { type: 'style', section: 'Styles' },
                        { type: 'chore', section: 'Miscellaneous Chores', hidden: true },
                        { type: 'refactor', section: 'Code Refactoring' },
                        { type: 'test', section: 'Tests' },
                        { type: 'build', section: 'Build System' },
                        { type: 'ci', section: 'Continuous Integration' }
                    ]
                }
            }
        ],
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
                prepareCmd: './scripts/semantic-release/assets.sh -v ${nextRelease.version}',
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
