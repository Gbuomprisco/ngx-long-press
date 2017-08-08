const path = require('path');
const ROOT = path.resolve(__dirname, '.');
const root = path.join.bind(path, ROOT);

module.exports = {
    devtool: 'cheap-module-source-map',

    resolve: {
        extensions: ['.ts', '.js']
    },

    module: {
        rules: [
            {
                enforce: 'post',
                test: /\.ts/,
                include: path.resolve(__dirname, 'src'),
                exclude: [
                    /\.(e2e|spec)\.ts$/,
                    /tests/,
                    /node_modules/
                ],
                loader: 'istanbul-instrumenter-loader',
                query: {
                    esModules: true
                }
            },
            {
                test: /\.ts$/,
                loaders: ['angular2-template-loader', 'awesome-typescript-loader']
            },
            {
                test: /\.png/,
                loader: "url-loader",
                query: { mimetype: "image/png" }
            },
            {
                test: /\.css$/,
                loader: 'css-loader'
            },
            {
                test: /\.html$/,
                loader: "html-loader"
            },
            {
                test: /\.scss$/,
                loaders: ['raw-loader', "sass-loader"]
            }
        ]
    }
};
