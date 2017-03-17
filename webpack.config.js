const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

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
                loader: 'babel-loader?presets[]=es2015&presets[]=react'
            },
            {
                test: /\.css/,
                loader: ExtractTextPlugin.extract({ fallback: 'style-loader', use: 'css-loader' })
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin('../css/build.min.css')
    ]
};