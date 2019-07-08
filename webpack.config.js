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
        configration: './src/public/javascripts/interactive/configuraction.js',  //配置文件
        login: './src/public/javascripts/interactive/login.js', //登陆操作
        index: './src/public/javascripts/interactive/index.js', //common 首页
        list: './src/public/javascripts/interactive/list.js', // 列表页
        crud: './src/public/javascripts/interactive/crud.js'  //增删改查
    },
    devServer: {
        port: 3000,
        progress: true,
        contentBase: './dist',
        compress: true
    },
    devtool: 'eval-source-map',
    watch:true,
    watchOptions:{
        poll: 1000,
        aggregateTimeOut: 300,
        ignored: /node_modules/
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
        new HtmlWebpackPlugin({  //formulaList
            template: './src/views/formulaList.html',
            filename: '../views/formulaList.html',
            minify: {
                removeAttributeQuotes: true,
                collapseWhitespace: true
            },
            hash: true,
            chunks: ['configration', 'list']
        }),
        new HtmlWebpackPlugin({  //tables
            template: './src/views/tables.html',
            filename: '../views/tables.html',
            minify: {
                removeAttributeQuotes: true,
                collapseWhitespace: true
            },
            hash: true,
            chunks: ['configration', 'list']
        }),
        new HtmlWebpackPlugin({  // u_Journal
            template: './src/views/u_Journal.html',
            filename: '../views/u_Journal.html',
            minify: {
                removeAttributeQuotes: true,
                collapseWhitespace: true
            },
            hash: true,
            chunks: ['configration', 'list']
        }),
        new HtmlWebpackPlugin({  //productList
            template: './src/views/productList.html',
            filename: '../views/productList.html',
            minify: {
                removeAttributeQuotes: true,
                collapseWhitespace: true
            },
            hash: true,
            chunks: ['configration', 'list']
        }),
        new HtmlWebpackPlugin({  //detailedList
            template: './src/views/detailedList.html',
            filename: '../views/detailedList.html',
            minify: {
                removeAttributeQuotes: true,
                collapseWhitespace: true
            },
            hash: true,
            chunks: ['configration', 'list']
        }),
        new HtmlWebpackPlugin({  //equipmentList
            template: './src/views/equipmentList.html',
            filename: '../views/equipmentList.html',
            minify: {
                removeAttributeQuotes: true,
                collapseWhitespace: true
            },
            hash: true,
            chunks: ['configration', 'list']
        }),
        new HtmlWebpackPlugin({  //equipmentLongUpdate
            template: './src/views/equipmentLongUpdate.html',
            filename: '../views/equipmentLongUpdate.html',
            minify: {
                removeAttributeQuotes: true,
                collapseWhitespace: true
            },
            hash: true,
            chunks: ['configration', 'list']
        }),
        new HtmlWebpackPlugin({  //smallLocationConfig
            template: './src/views/smallLocationConfig.html',
            filename: '../views/smallLocationConfig.html',
            minify: {
                removeAttributeQuotes: true,
                collapseWhitespace: true
            },
            hash: true,
            chunks: ['configration', 'list']
        }),
        new HtmlWebpackPlugin({  //advertisementRootList adRootDetailedList
            template: './src/views/advertisementRootList.html',
            filename: '../views/advertisementRootList.html',
            minify: {
                removeAttributeQuotes: true,
                collapseWhitespace: true
            },
            hash: true,
            chunks: ['configration', 'list']
        }),
        new HtmlWebpackPlugin({  // adRootDetailedList
            template: './src/views/adRootDetailedList.html',
            filename: '../views/adRootDetailedList.html',
            minify: {
                removeAttributeQuotes: true,
                collapseWhitespace: true
            },
            hash: true,
            chunks: ['configration', 'list']
        }),
        new HtmlWebpackPlugin({  // chartsFinance
            template: './src/views/chartsFinance.html',
            filename: '../views/chartsFinance.html',
            minify: {
                removeAttributeQuotes: true,
                collapseWhitespace: true
            },
            hash: true,
            chunks: ['configration', 'list']
        }),
        new HtmlWebpackPlugin({  // chartsActive systemUserList
            template: './src/views/chartsActive.html',
            filename: '../views/chartsActive.html',
            minify: {
                removeAttributeQuotes: true,
                collapseWhitespace: true
            },
            hash: true,
            chunks: ['configration', 'list']
        }),
        new HtmlWebpackPlugin({  //systemUserList 
            template: './src/views/systemUserList.html',
            filename: '../views/systemUserList.html',
            minify: {
                removeAttributeQuotes: true,
                collapseWhitespace: true
            },
            hash: true,
            chunks: ['configration', 'list']
        }),
        new HtmlWebpackPlugin({  // systemUserLvList
            template: './src/views/systemUserLvList.html',
            filename: '../views/systemUserLvList.html',
            minify: {
                removeAttributeQuotes: true,
                collapseWhitespace: true
            },
            hash: true,
            chunks: ['configration', 'list']
        }),
        new HtmlWebpackPlugin({  // feedbackList
            template: './src/views/feedbackList.html',
            filename: '../views/feedbackList.html',
            minify: {
                removeAttributeQuotes: true,
                collapseWhitespace: true
            },
            hash: true,
            chunks: ['configration', 'list']
        }),
        new HtmlWebpackPlugin({  // couponList 
            template: './src/views/couponList.html',
            filename: '../views/couponList.html',
            minify: {
                removeAttributeQuotes: true,
                collapseWhitespace: true
            },
            hash: true,
            chunks: ['configration', 'list']
        }),
        new HtmlWebpackPlugin({  //  orderList 
            template: './src/views/orderList.html',
            filename: '../views/orderList.html',
            minify: {
                removeAttributeQuotes: true,
                collapseWhitespace: true
            },
            hash: true,
            chunks: ['configration', 'list']
        }),
        new HtmlWebpackPlugin({  //  refundOrder 
            template: './src/views/refundOrder.html',
            filename: '../views/refundOrder.html',
            minify: {
                removeAttributeQuotes: true,
                collapseWhitespace: true
            },
            hash: true,
            chunks: ['configration', 'list']
        }),
        new HtmlWebpackPlugin({  //  orderEverDayList
            template: './src/views/orderEverDayList.html',
            filename: '../views/orderEverDayList.html',
            minify: {
                removeAttributeQuotes: true,
                collapseWhitespace: true
            },
            hash: true,
            chunks: ['configration', 'list']
        }),
        new HtmlWebpackPlugin({  //  financialManagement
            template: './src/views/financialManagement.html',
            filename: '../views/financialManagement.html',
            minify: {
                removeAttributeQuotes: true,
                collapseWhitespace: true
            },
            hash: true,
            chunks: ['configration', 'list']
        }),
        new HtmlWebpackPlugin({  //  RepairPersonnelList 
            template: './src/views/RepairPersonnelList.html',
            filename: '../views/RepairPersonnelList.html',
            minify: {
                removeAttributeQuotes: true,
                collapseWhitespace: true
            },
            hash: true,
            chunks: ['configration', 'list']
        }),
        new HtmlWebpackPlugin({  //  materialLog  
            template: './src/views/materialLog.html',
            filename: '../views/materialLog.html',
            minify: {
                removeAttributeQuotes: true,
                collapseWhitespace: true
            },
            hash: true,
            chunks: ['configration', 'list']
        }),
        new HtmlWebpackPlugin({  //  编辑添加之类的操作  
            template: './src/views/AddFormula.html',
            filename: '../views/AddFormula.html',
            minify: {
                removeAttributeQuotes: true,
                collapseWhitespace: true
            },
            hash: true,
            chunks: ['configration', 'crud']
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
