module.exports = {
    // eslint-disable-next-line global-require
    ...require('../jest.project-settings'),
    displayName: 'client',
    testEnvironment: 'jsdom',
    rootDir: `${__dirname}/src`,
    modulePaths: ['<rootdir>/../../shared'],
    testPathIgnorePatterns: ['/node_modules/', '/dist/'],
}
