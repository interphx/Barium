var path = require('path');

module.exports = {
    entry: ['./dist/test/test.js'],
    output: {
        filename: 'test.js'
    },
    resolve: {
        root: [
            path.resolve('./dist/src/')
        ]
    }
};
