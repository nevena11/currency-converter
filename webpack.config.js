/**
 * Webpack configuration
 * Author: Nevena Jovanovic, nevenaj89@gmail.com
 * Date: 1.9.2017
 * Copyright: UNLICENSED (c) 2017 Nevena Jovanovic
 * Version: 1.0.0
 */

/*eslint no-console: "off"*/

// Dependencies
const webpack = require('webpack');
const path = require('path');
const glob = require('glob');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CommonsChunkPlugin = require('webpack/lib/optimize/CommonsChunkPlugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const svg2png = require('svg2png');

// Constants
const DEV = process.env.NODE_ENV !== "production";

// Extract SASS into CSS
const extractSass = new ExtractTextPlugin({
    filename: "[name].[contenthash].css",
    disable: DEV
});

// Webpack configuration
const config = {
    output: {
        filename: '[name].bundle' + (DEV ? '' : `.${new Date().getTime()}.min`) + '.js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: [
                    'angular2-template-loader',
                    'ts-loader'
                ],
                exclude: [
                    '/node_modules/',
                    new RegExp('reflect-metadata\\' + path.sep + 'Reflect\\.ts')
                ]
            },
            {
                test: /\.html$/,
                use: 'raw-loader'
            },
            {
                test: /\.css$/,
                use: [
                    'to-string-loader',
                    'style-loader',
                    'css-loader'
                ],
            },
            {
                test: /\.scss$/,
                use: extractSass.extract({
                    use: [
                        'to-string-loader',
                        {
                            loader: "css-loader",
                            options: {
                                sourceMap: DEV,
                                minimize: !DEV
                            }
                        },
                        {
                            loader: "sass-loader",
                            options: {
                                sourceMap: DEV,
                                minimize: !DEV
                            }
                        }
                    ],
                    // use style-loader in development
                    fallback: [
                        'to-string-loader',
                        "style-loader"
                    ]
                })
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    'file-loader?name=/images/[name].[ext]'
                ]
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: [
                    'file-loader'
                ]
            },
            {
                test: /\.(pug|jade)$/,
                use: [
                    'pug-loader'
                ]
            },
            {
                test: /\.font\.js/,
                loader: ExtractTextPlugin.extract({
                    use: [
                        'style-loader',
                        'css-loader',
                        'webfonts-loader'
                    ]
                })
            }
        ]
    },
    resolve: {
        extensions: [ ".tsx", ".ts", ".js" ]
    },
    devServer: {
        contentBase: './dist',
        proxy: { //  Send API requests on localhost to API server get around CORS
            '/exchange-rates/': {
                target: 'https://api.kursna-lista.info/b7b80a59415046c33449b6a2a96bd4d8/kursna_lista',
                // secure: false,
                changeOrigin: true,
                bypass: function(req, res, proxyOptions) {
                    if(req.method !== 'GET') {
                        return false;
                    }
                }
            }
        }
    },
    plugins: [
        new webpack.ProgressPlugin(),
        new CleanWebpackPlugin(['dist']),
        extractSass,
        new CopyWebpackPlugin([
            {
                from: './src/images/icons/swap.svg',
                transform: (content, path) => svg2png.sync(Buffer.from(content)),
                to: 'images/icons/favicon.png'
            }
        ]),
        // Added this workaround for @angular/core.es5.js
        // https://github.com/angular/angular/issues/11580#issuecomment-282705332
        new webpack.ContextReplacementPlugin(
            /angular(\\|\/)core(\\|\/)@angular/,
            path.resolve(__dirname, '../src')
        )
    ]
};

// Get all pug templates
glob.sync(`./src/templates/*.?(pug|jade)`).forEach(item => {
    config.plugins.push(
        new HtmlWebpackPlugin({
            filename: `${path.basename(item, path.extname(item))}.html`,
            template: item
        })
    );
});

// Environment specific configuration
if (!DEV) {

    // Set entry configuration property
    config.entry = {
        app: [
            './src/style/main.scss',
            './src/app/polyfills.ts',
            './src/app/app.main.ts'
        ]
    };

    // Minify JS
    config.plugins.push(new webpack.optimize.UglifyJsPlugin());
} else {

    // Set entry configuration property
    config.entry = {
        'global': './src/style/main.scss',
        'polyfills': './src/app/polyfills.ts',
        'main': './src/app/app.main.ts'
    };

    // Generate source maps
    config.devtool = 'source-map';

    // Set proper order for polyfills
    config.plugins.push(new CommonsChunkPlugin({
        names: ['polyfills'].reverse()
    }));
}

// Export configuration
module.exports = config;
