const webpack = require('webpack');
const path = require('path');
const precss = require('precss');
const autoprefixer = require('autoprefixer');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const ROOT = path.resolve(__dirname, '.');
const root = path.join.bind(path, ROOT);
const { TsConfigPathsPlugin } = require('awesome-typescript-loader');
const CommonsChunkPlugin = require('webpack/lib/optimize/CommonsChunkPlugin');

const webpackConfig = {
    entry: {
        'vendor': [
            '@angular/core',
            'rxjs',
        ],
        'ngx-long-press': './src/index.ts'
    },

    output: {
        path: path.resolve('./dist'),
        libraryTarget: "umd",
        library: 'ngx-long-press'
    },

    externals: {
        "@angular/core": true,
        'rxjs/Observable': true,
        'rxjs/Subject': true,
        "rxjs/add/observable/interval": true,
        'rxjs/add/operator/takeUntil': true,
        'rxjs/add/operator/filter': true,
        'rxjs/add/operator/map': true,
        'rxjs/add/operator/switch': true,
        'rxjs/add/operator/combineLatest': true,
        'rxjs/add/operator/repeat': true,
    },

    module: {
        rules: [
            // .ts files for TypeScript
            {
                test: /\.ts$/,
                loaders: ['angular2-template-loader', 'awesome-typescript-loader']
            },
            {
                test: /\.png/,
                loader: "url-loader",
                query: {mimetype: "image/png"}
            },
            {
                test: /\.html$/,
                loader: "html-loader"
            },
            {
                test: /\.(css|scss)$/,
                loaders: ['to-string-loader', 'css-loader', 'sass-loader']
            }
        ]
    }
};

// Our Webpack Defaults
const defaultConfig = {
    devtool: 'cheap-module-source-map',
    cache: true,
    output: {
        filename: '[name].bundle.js',
        sourceMapFilename: '[name].map',
        chunkFilename: '[name].chunk.js'
    },

    module: {
        loaders: [
            {
                enforce: 'pre',
                test: /\.js$/,
                loader: 'source-map-loader',
                exclude: [
                    // these packages have problems with their sourcemaps
                    path.join(__dirname, 'node_modules', 'rxjs'),
                    path.join(__dirname, 'node_modules', '@angular')
                ]
            }
        ]
    },

    resolve: {
        extensions: ['.ts', '.js', '.scss'],
        modules: [root('src'), root('factories'), root('node_modules')],
    },

    devServer: {
        historyApiFallback: true,
        watchOptions: {aggregateTimeout: 300, poll: 1000}
    },

    plugins: [
        new webpack.LoaderOptionsPlugin({
            options: {
                tslint: {
                    emitErrors: true,
                    failOnHint: true,
                    resourcePath: 'src'
                },

                postcss: () => [precss, autoprefixer]
            }
        }),
        new TsConfigPathsPlugin(),

        new CommonsChunkPlugin({
            name: 'ngx-long-press'
        })
    ]
};

const webpackMerge = require('webpack-merge');
module.exports = webpackMerge(defaultConfig, webpackConfig);
