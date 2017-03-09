const webpack = require('webpack');

module.exports = {
    entry :{
        index: __dirname.concat('/src/index.jsx'),
        vendor: ['react', 'react-dom']
    },
    output: {
        path : __dirname.concat('/app'),
        filename : '[name].js'
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
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            names: ['vendor', 'manifest'],
        }),
        // new webpack.optimize.UglifyJsPlugin()
    ]
};