const path = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

//*     for extract css in own file
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

//*     for optimization
//*         Terser for minify javascript files but in webpack V5 this plugin is default settings
//*         old
const TerserWebpackPlugin = require('terser-webpack-plugin')
//*         CssMinimizer for minify css files.
const CssMinimizerWebpackPlugin = require('css-minimizer-webpack-plugin')


const isDev = process.env.NODE_ENV === 'development'
const isProd = !isDev
console.log('isDev: ' + isDev)


module.exports = {
    // context: path.resolve(__dirname, 'src'),
    mode: 'development',
    entry: {
        main: path.resolve(__dirname,'src/index.js'),
        analytics: path.resolve(__dirname,'src/analytics.js'),
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
        },
        minimizer: [
            //* For webpack@5 you can use the `...` syntax to extend existing minimizers (i.e. `terser-webpack-plugin`), uncomment the next line
            `...`,
            new CssMinimizerWebpackPlugin(),
        ],
        //*     If you want to run CssMinimizerWebpackPlugin() also in dev mode set the optimization.minimize option to true:
        //minimize: true,
    },
    devServer: {
        port: 5501
    },
    plugins: [
        new HTMLWebpackPlugin({
            template: path.resolve(__dirname,'src/index.html'),
            //*     for optimization. min html file if in production mode (isProd)
            minify: {
                collapseWhitespace: isProd
            },
        }),
        new CleanWebpackPlugin(),
        //* We use an html-loader so we don't need to copy icons or images to the dist folder.
        // new CopyWebpackPlugin({
        //     patterns: [
        //         {
        //             from: path.resolve(__dirname, 'src/favicon.ico'),
        //             to: path.resolve(__dirname, 'dist')
        //         },
        //     ],
        // }),
        new MiniCssExtractPlugin({
            filename: '[name].[contenthash].css',
        }),
    ],
    module: {
        rules: [
            {
                test: /\.css$/,
                //* webpack go from right to left !!!
                //* style-loader add styles to head section in html file
                //use: ['style-loader', 'css-loader']
                //* If you need the CSS to be in the own file, and not in the header of html file
                use: [MiniCssExtractPlugin.loader, 'css-loader']
            },
            {
                test: /\.(scss|sass)$/,
                //* webpack go from right to left !!!
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
            },
            {
                test: /\.(png|jpg|jpeg|gif|ico|svg)$/,
                type: 'asset/resource'
                //* old
                //use: ['file-loader']
            },
            {
                test: /\.(ttf|woff|woff2|eot)$/,
                type: 'asset/resource'
                //* old
                // use: ['file-loader']
            },
            {
                test: /\.html$/,
                use: ['html-loader']
            },
        ]
    }
}