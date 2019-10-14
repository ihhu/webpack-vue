const webpack = require('webpack');
const VueLoaderPlugin=require("vue-loader/lib/plugin");
const HtmlWebpackPlugin=require("html-webpack-plugin");

const { PATHS, resolves } = require("./config.js")
const { getEnvs,getIPAdress }=require("./utils.js")

// 获取环境变量
let env_array = getEnvs();
let ipAddress = getIPAdress();
// 设置环境变量
env_array.forEach(e => {
    let [key, value] = e.split('=');
    if (value === 'false' || value === 'true') {
        process.env[key] = JSON.parse(value);
    } else {
        process.env[key] = value;
    }
}); 
process.env.__HOST=ipAddress[0];

const baseConf={
    entry:{
        main:`${PATHS.entry}main.js`
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
                loader:"vue-loader",
                options:{
                    compilerOptions:{preserveWhitespace:false}
                }
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
        ...resolves
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
            favicon:`${PATHS.entry}favicon.ico`,
            filename:`./index.html`,
            template:`${PATHS.views}Index.ejs`,
            commonCssLink:[
				// "//at.alicdn.com/t/font_1317347_ft563urqo0g.css"
			]
        }),
        new webpack.HashedModuleIdsPlugin(),     //hash id 缓存
        new webpack.DefinePlugin({
            env: JSON.stringify(process.env)
        })
    ]
}

module.exports=baseConf;