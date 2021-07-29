const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './login/login.ejs',
    output: {
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/',
        filename: 'bundle.js',
    },
    devtool: 'eval-source-map',
    mode: 'development',
    devServer: {
        host: 'localhost',
        port: 8080,
        contentBase: path.resolve(__dirname, 'dist'),
        hot: true,
        publicPath: '/',
        historyApiFallback: true,
        inline: true,
        headers: { 'Access-Control-Allow-Origin': '*' },
        proxy: {
            '/': 'http://localhost:3000',
        }
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react']
                        },
                    },
            },
            {
                test: /.(css|scss)$/,
                exclude: /node_modules/,
                use: ['style-loader', 'css-loader'],
            }
        ],
    },
    plugins: [
        new HtmlWebPackPlugin({
          template: './index.ejs',
          filename: './index.ejs',
        })
    ],
    resolve: {
        extensions: ['.js', '.jsx']
    },

};