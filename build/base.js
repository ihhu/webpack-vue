const webpack = require('webpack');
const VueLoaderPlugin=require("vue-loader/lib/plugin");
const HtmlWebpackPlugin=require("html-webpack-plugin");

const path=require("path");
const {BASE_PATH} = require("./config.js")
const resolve = dir => path.join(__dirname, "..", dir);

module.exports={
    entry:{
        main:`${BASE_PATH}/src/main.js`
    },
    optimization:{
        splitChunks: {
            automaticNameDelimiter: '.',
            cacheGroups:{
                vendors: {
                    test: /[\\/]node_modules[\\/]/,
                    chunks: 'all',
                    priority: -10
                }
            }
            
        }
    },
    module:{
        rules:[
            {
                test:/\.js$/,
                exclude:[/node_modules/],
                loader:"babel-loader"
            },
            {
                test:/\.vue$/,
                loader:"vue-loader"
            },
            {
                test:/\.html$/,
                use:[
                    {
                        loader:"html-loader",
                        options:{
                            minimize:true
                        }
                    }
                ]
            }
        ]
    },
    resolve:{
        alias:{
            "@": resolve("src"),
            'vue':"vue/dist/vue.esm.js"
        },
        modules: [
            resolve("src"),
            resolve("node_modules")
        ]
    },
    plugins:[
        new VueLoaderPlugin(),
        new HtmlWebpackPlugin({
            title:"主页",
            minify:{
                "collapseWhitespace":true,  // 折叠空白区域
                "collapseInlineTagWhitespace":true,
                "conservativeCollapse":true,
                "removeRedundantAttributes":true, // 删除多余的属性
                "removeAttributeQuotes": true, // 移除属性的引号
                "removeComments": true, // 移除注释
                "collapseBooleanAttributes": true // 省略只有boolean 值的属性值 例如：readonly checked
            },
            filename:`./index.html`,
            template:`${BASE_PATH}/public/Index.ejs`
        }),
        new webpack.HashedModuleIdsPlugin()     //hash id 缓存
    ]
}