module.exports = {
    mode: 'development',
    entry: {
        index: `${__dirname}/app.console.mjs`
    },
    output: {
        path: __dirname + "/temp",
        filename: 'console.mjs',
        chunkFilename: 'console.mjs',
        library: 'console'
    }
};
