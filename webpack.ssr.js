const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const glob = require('glob');
const HtmlWebpackExternalsPlugin = require('html-webpack-externals-plugin');

const setMPA = () => {
    const entry = {};
    const htmlWebpackPlugins = [];
    
    const entryFiles = glob.sync(path.join(__dirname, './src/*/index-server.js'))
    console.log('entryFiles', entryFiles)
    Object.keys(entryFiles).map((index) => {
        const entryFile = entryFiles[index];
        const match = entryFile.match(/src\/(.*)\/index-server.js/);
        const pageName = match && match[1];
        console.log(pageName);
        if (pageName) {
          entry[pageName] = entryFile;
          htmlWebpackPlugins.push(new HtmlWebpackPlugin({
              template: path.join(__dirname, `src/${pageName}/index.html`),
              filename: `${pageName}.html`,
              chunks: [pageName],
              inject: true,
              minify: {
                  html5: true,
                  collapseWhitespace: true,
                  minifyCSS: true,
                  preserveLineBreaks: false,
                  minifyJS: true,
                  removeComments: false
              }
          }))
        }
    })
    return {
        entry,
        htmlWebpackPlugins
    }
}
const { entry, htmlWebpackPlugins } = setMPA();

module.exports = {
    entry,
    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name]-server.js',
        libraryTarget: 'umd'
    },
    plugins:[
      new MiniCssExtractPlugin({
          filename: '[name]_[contenthash:8].css'
      }),
      new OptimizeCSSAssetsPlugin({
          assetNameRegExp: /\.css$/g,
          cssProcessor: require('cssnano')
      }),
      new CleanWebpackPlugin(),
    //   new HtmlWebpackExternalsPlugin({
    //       externals: [{
    //           module: 'react',
    //           entry: 'https://cdn.bootcdn.net/ajax/libs/react/16.13.1/umd/react.production.min.js',
    //           global: 'React',
    //       },
    //       {
    //         module: 'react-dom',
    //         entry: 'https://cdn.bootcdn.net/ajax/libs/react-dom/16.13.1/umd/react-dom.production.min.js',
    //         global: 'ReactDOM',
    //     }
    //     ]

    //   })
    ].concat(htmlWebpackPlugins),
    module: {
        rules: [{
            test: /\.js$/,
            use: 
            [
                'babel-loader',
            ]
        }, {
            test: /.css$/,
            use: [
                // 'style-loader',
                MiniCssExtractPlugin.loader,
                'css-loader'
            ]
        }, {
            test: /.less$/,
            use: [
                MiniCssExtractPlugin.loader,
                'css-loader',
                'less-loader',
                'postcss-loader',
                {
                    loader: 'px2rem-loader',
                    options: {
                        remUnit: 75,
                        remPrecision: 8
                    }
                }
            ]
        }, {
            test: /\.(png|jpg|gif|jpeg)$/,
            use: [{
                loader: 'file-loader',
                options: {
                    name: '[name]_[hash:8].[ext]'
                }
            }]
        }]
    },
    // optimization: {
    //     splitChunks: {
    //         minSize: 0,
    //         cacheGroups: {
    //             commons: {
    //                 test: /(react)|(react-dom)/,
    //                 name: 'vendors',
    //                 chunks: 'all'
    //             }
    //         }
    //     }
    // },
    optimization: {
        splitChunks: {
            minSize: 1000,
            cacheGroups: {
                commons: {
                    name: 'commons',
                    chunks: 'all',
                    minChunks: 2
                }
            }
        }
    },
    devtool: 'source-map',
    mode: 'production'
}