var path = require('path');

module.exports = {
    entry: ['./dist/src/barium.js'],
    externals: ['p2'],
    output: {
        filename: 'app.js',
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
