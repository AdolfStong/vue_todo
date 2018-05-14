const path = require('path');
const HTMLPlugin = require('html-webpack-plugin')
const webpack  = require('webpack')

const isDev = process.env.NODE_ENV === 'development';
const config = {
    target:'web',
    entry:path.join(__dirname,'src/index.js'),//输入
    output:{//输出
        filename:'bundle.js',
        path:path.join(__dirname,'dist')
    },
    module:{
        rules:[
            {
                test:/\.vue$/,//这是个RegExp
                loader:'vue-loader'
            },
            {
                test:/\.jsx$/,//这是个RegExp
                loader:'babel-loader'
            },
            {
                test:/\.css$/,
                use:[
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test: /\.styl$/, 
                use:[
                    'style-loader',
                    'css-loader',
                    {
                        loader:'postcss-loader',
                        options:{
                            sourceMap:true,
                        }
                    },
                    'stylus-loader',
                ]
            },
            {
                test:/\.(gif|jpg|jpeg|png|svg)$/,
                use:[
                    {
                        loader:'url-loader',
                        options:{
                            limit:1024,
                            name:'[name]-adolf.[ext]'
                        }
                    }
                ]
            }
        ],
    },
    plugins:[
        new webpack.DefinePlugin({
            'process.env':{
                NODE_ENV:isDev ? '"development"' : '"production"'
            }
        }),
        new HTMLPlugin()
    ]
}

if(isDev){
    config.devtool = '#cheap-module-eval-source-map';
    config.devServer = {
        port:8000,
        host:'0.0.0.0',
        overlay:{//错误在网页上显示
            errors:true,
        },
        hot:true,//热加载，数据更改后不用刷新页面
        // open:true  //自动打开浏览器
    }
    config.plugins.push(
        new webpack.HotModuleReplacementPlugin(),//启动hotModule功能的plugin
        new webpack.NoEmitOnErrorsPlugin()//不显示不需用的信息
    )
}

module.exports = config;