var path = require('path');
var webpack = require('webpack');

module.exports = {
    devtool: 'eval',
    entry: './src/index.jsx',
    output: {
        path: path.join(__dirname, './www/dist'),
        filename: 'bundle.js'
    },
    plugins: [
        new webpack.ProvidePlugin({
            "$": "jquery",
            "_": "lodash"
        })
    ],
    module: {
        loaders: [
            {
                test: /\.js(x)?$/,
                loaders: ['babel'],
                include: path.join(__dirname, 'src')
            },
            {
                test: /\.css$/,
                loaders: ['style', 'css']
            },
            {
                test: /\.json$/,
                loaders: ['json']
            }
        ]
    },
    resolve: {
        root: [
            path.resolve('./src')
        ]
    }
};
