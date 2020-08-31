module.exports = {
    // eslint-disable-next-line global-require
    ...require('../jest.project-settings'),
    displayName: 'server',
    rootDir: `${__dirname}/src`,
    modulePaths: ['<rootdir>/../../shared'],
}
