var path = require('path');
var webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const IS_BUILD = process.env.NODE_ENV === 'production';

var fileLoaderOption = {
    loader: 'file-loader',
    options: {
        name: '[path][name].[ext]',
        outputPath: function(path) {
            // console.log(arguments);
            // console.log(path);
            // console.log("【路径↑】");
            return path.replace(/^src/g, ".");
        }
    }
};

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, './dist'),
        publicPath: IS_BUILD?"":'/dist/',
        filename: 'build.js'
    },
    module: {
        rules: [{
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    loaders: {},
                    extractCSS: IS_BUILD
                        // other vue-loader options go here
                }
            }, {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf|png|jpg|gif|svg)$/,
                use: [fileLoaderOption]
            }, {
                test: /\.less$/,
                use: !!!IS_BUILD ? ['style-loader', 'css-loader', 'less-loader'] : ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: ["css-loader", "less-loader"]
                })
            }, {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            }
        ]
    },
    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.esm.js',
            "screen.less":path.resolve(__dirname, './src/screen.less'),

        }
    },
    devServer: {
        historyApiFallback: true,
        noInfo: true
    },
    performance: {
        hints: false
    },
    devtool: '#eval-source-map',
    plugins: [
        new ExtractTextPlugin("gzs.min.css"),
    ]
}

if (process.env.NODE_ENV === 'production') {
    module.exports.devtool = '#source-map'
        // http://vue-loader.vuejs.org/en/workflow/production.html
    module.exports.plugins = (module.exports.plugins || []).concat([
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            sourceMap: true,
            compress: {
                warnings: false
            }
        }),
        new webpack.LoaderOptionsPlugin({
            minimize: true
        }),

    ])
}

/* 
if (module.hot) {
    module.hot.accept('./dist/gzs.min.css', function() {
        console.log('Accepting the updated printMe module!');
        // printMe();
    })
} */