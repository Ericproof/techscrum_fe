const config = {
    branches: ['master'],
    repositoryUrl: "https://bitbucket.org/010001/fe.techscrum.git",
    plugins: [
      '@semantic-release/commit-analyzer',
      '@semantic-release/release-notes-generator',
      '@semantic-release/changelog',
      ['@semantic-release/git', {
        'assets': ['dist/*.js', 'dist/*.js.map'],
        'message': 'chore(release): ${nextRelease.version} [skip ci]\n\n${nextRelease.notes}',
      }],
    ],
  };
      
  module.exports = config;