const webpack = require('webpack');

module.exports = {
    devtool: "source-map",
    entry :{
        index: __dirname.concat('/src/index.jsx')
    },
    output: {
        path : __dirname.concat('/app/js'),
        filename : 'index.js'
    },
    module : {
        loaders : [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015','react']
                }
            }
        ]
    }
};