var path = require('path');

module.exports = {
    entry: ['./dist/test/test.js'],
    externals: ['p2'],
    output: {
        filename: 'test.js'
    },
    resolve: {
        root: [
            path.resolve('./dist/src/')
        ]
    }
};
