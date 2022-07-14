const path = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
    context: path.resolve(__dirname, 'src'),
    mode: 'development',
    entry: {
        main: './index.js',
        analytics: './analytics.js'
    },
    output: {
        filename: '[name].[contenthash].js',
        path: path.resolve(__dirname, 'dist')
    },
    resolve: {
        //* if you don't want to write .png after path to the file. (.js and .json are default settings)
        //extensions: ['.js', '.json', '.png'],
        //* alias for path. For example:        import Post from '@/Post.js'
        alias: {
            '@': path.resolve(__dirname, 'src'),
            '@node_modules': path.resolve(__dirname, 'node_modules')
        }
    },
    optimization: {
        //*     The optimization for the included libs. For example the jquery module imported two times
        //*     in the two files (index.js and analytics.js), but in the dist included only one time.
        splitChunks: {
            chunks: 'all'
        }
    },
    devServer: {
        port: 5501
    },
    plugins: [
        new HTMLWebpackPlugin({
            template: './index.html'
        }),
        new CleanWebpackPlugin(),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, 'src/favicon.ico'),
                    to: path.resolve(__dirname, 'dist')
                },
            ],
        }),
    ],
    module: {
        rules: [
            {
                test: /\.css$/,
                //* webpack go from right to left !!!
                //* style-loader add styles to head section in html file
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.(png|jpg|jpeg|gif|ico|svg)$/,
                type: 'asset/resource'
                //use: ['file-loader']
            },
            {
                test: /\.(ttf|woff|woff2|eot)$/,
                type: 'asset/resource'
                // use: ['file-loader']
            }
        ]
    }
}