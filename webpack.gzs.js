const merge = require('webpack-merge');
const common = require('./webpack.config.js');

module.exports = merge(common, {
    entry: './src/gzs.js',
    output:{
    	filename:"gzs.js",
    	library: "gzs",
        libraryTarget: 'umd'
    }
});