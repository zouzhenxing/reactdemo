const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry :{
        index: __dirname.concat('/src/index.jsx'),
        vendor: ['react', 'react-dom']
    },
    output: {
        path : __dirname.concat('/app/js'),
        filename : '[name].js'
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
        new webpack.optimize.CommonsChunkPlugin({
            names: ['vendor', 'manifest'],
        }),
        new webpack.optimize.UglifyJsPlugin(),
        new ExtractTextPlugin('../css/build.min.css')
    ]
};