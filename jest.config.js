module.exports = {
    transform: {
        '^.+\\.(ts|tsx)$': 'babel-jest',
    },
    testEnvironment: 'jest-environment-jsdom',
};