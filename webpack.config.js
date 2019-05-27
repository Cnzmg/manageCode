var [path, HtmlWebpackPlugin, MiniCssExtractPlugin, optimizecssassets, uglifyjs] = [
    require('path'), require('html-webpack-plugin'), require('mini-css-extract-plugin'), require('optimize-css-assets-webpack-plugin'), require('uglifyjs-webpack-plugin')
];

module.exports = {
    mode: 'development',  //模式 production development
    optimization: {
        minimizer: [
            new uglifyjs({
                cache: false
            }),
            new optimizecssassets()
        ]
    },
    entry: {
        configration: './src/public/javascripts/interactive/configuraction.js',
        login: './src/public/javascripts/interactive/login.js',
        index: './src/public/javascripts/interactive/index.js'
    },
    devServer: {
        port: 3000,
        progress: true,
        contentBase: './dist',
        compress: true
    },
    output: {
        filename: '[name]._23_aKvs-b8bW2Vg3fwHozO.js',
        path: path.resolve(__dirname, './src/dist/javascripts/')
    },
    plugins: [
        new HtmlWebpackPlugin({  //login
            template: './src/views/login.html',
            filename: '../login.htm',
            minify: {
                removeAttributeQuotes: true,
                collapseWhitespace: true
            },
            hash: true,
            chunks: ['configration', 'login']
        }),
        new HtmlWebpackPlugin({  //common/index
            template: './src/views/index.html',
            filename: '../views/common/index.htm',
            minify: {
                removeAttributeQuotes: true,
                collapseWhitespace: true
            },
            hash: true,
            chunks: ['configration', 'index']
        }),
        new HtmlWebpackPlugin({  //app
            template: './src/views/app.html',
            filename: '../views/index.htm',
            minify: {
                removeAttributeQuotes: true,
                collapseWhitespace: true
            },
            hash: true,
            chunks: ['']
        }),
        new MiniCssExtractPlugin({
            template: './src/public/stylesheets/base/style.css',
            filename: '../stylesheets/[name]_23_aKvs-b8bW2Vg3fwHozO.css'
        })
    ],
    module: {
        rules: [
            {
                test: /\.css$/, use: [
                    {
                        loader: 'style-loader',
                        options: {
                            insertAt: 'top'  //出现在顶部
                        }
                    },
                    MiniCssExtractPlugin.loader,
                    'css-loader'
                ]
            },
            {
                test: /\.js$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },
            {
                test: /\.(png|jpg|gif)$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        limit: 10 * 1024,
                        outputPath: '../../images/'
                    }
                }
            },
            {
                test: /\.(html)$/,
                use: {
                    loader: 'html-loader',
                    options: {
                        attrs: ['img:src', 'img:data-src', 'audio:src'],
                        minimize: false
                    }
                }
            }
        ]
    }
}
