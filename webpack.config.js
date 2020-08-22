const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const FixStyleOnlyEntriesPlugin = require("webpack-fix-style-only-entries")
const {CleanWebpackPlugin} = require("clean-webpack-plugin")

module.exports ={
    mode: 'development',
    entry: './src/sass/index.scss',
    output: {
        path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
        new FixStyleOnlyEntriesPlugin(),
        new MiniCssExtractPlugin({
            filename: 'index.css',
            chunkFilename: '[id].css'
        }),
        new OptimizeCssAssetsPlugin(),
        new CleanWebpackPlugin(),
    ],
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader'
                    },
                    {
                        loader: 'resolve-url-loader'
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true
                        }
                    }
                ]
            },
            {
                test: /\.(woff|woff2?|svg|ttf|eot)$/,
                use:[
                    {
                        loader: 'file-loader',
                        options: {
                            outputPath: 'iconfonts'
                        }
                    }
                ]
            }
        ]
    }
}