var path = require('path');

module.exports = {
    entry: ['./dist/src/barium.js'],
    output: {
        filename: 'barium.js',
        library: 'Barium',
        libraryTarget: 'umd',
        umdNamedDefine: true
    },
    resolve: {
        root: [
            path.resolve('./dist/src/')
        ]
    }
};
