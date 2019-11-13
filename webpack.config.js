const path = require('path')
const webpack = require('webpack');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const {CleanWebpackPlugin}  = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');


module.exports = {
    entry: './src/index.js',
    output: {
        path: path.join(__dirname,'/dist'),
        filename: 'bundle.js'
    },
    devServer: {
        contentBase: path.join(__dirname, "./src"),
        compress: true,
        port: 3000,
        watchContentBase: true,
        //progress: true
      },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: "babel-loader"
            },
            
            {
                test: /\.(sc|sa|c)ss$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                          publicPath: './',
                          hmr: process.env.NODE_ENV === 'development',
                        },
                      },
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: true,
                        }
                    },
                    {
                        loader: "sass-loader",
                        options: {
                            sourceMap: true
                        }
                    }
                    
                ]
            },
            {
              test: /\.(svg|png|jpg|gif|ico)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
              use: [
                    {
                      loader: 'file-loader',
                      options: {
                        name: '[name].[ext]',
                        outputPath: 'images/'
                      }
                    },
                    
                  ]
            },
            {
                test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
                use: [
                  {
                    loader: 'file-loader',
                    options: {
                      name: '[name].[ext]',
                      outputPath: 'fonts/'
                    }
                  }
                ]
            },
            { 
              test: /\.handlebars$/, 
              use: [
                {
                  loader: 'handlebars-loader'
                }
              ]
            },
            
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new webpack.LoaderOptionsPlugin({
          options: {
            handlebarsLoader: {}
          }
        }),
        new MiniCssExtractPlugin({
          filename: '[name].css',
          chunkFilename: '[id].css',
          ignoreOrder: false,
        }),
        new CopyWebpackPlugin([
          {from: './src/images', to: './images'}
        ]),
        new HtmlWebpackPlugin({
          template: "./src/index.handlebars",
          minify: {
            collapseWhitespace: true,
            removeScriptTypeAttributes: true,
            removeComments: true,
            removeScriptTypeAttributes: true,
            useShortDoctype: true,
            removeRedundantAttributes: true,
            },
        }),
        
      ]
}