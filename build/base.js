const webpack = require('webpack');
const VueLoaderPlugin=require("vue-loader/lib/plugin");
const HtmlWebpackPlugin=require("html-webpack-plugin");

const { PATHS, resolves,pages,commonCssLink } = require("./config.js")

// 多页面入口
function getEntrys(pages){
    let defaultHtmlOptions ={
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
        commonCssLink:[...commonCssLink]
    };
    let entrys = {};
    let HTMLPlugins = [];
    for (let key in pages){
        let page = pages[key];
        if(typeof page === "string"){
            let entry = page;
            let template = `${PATHS.views}${key}.html`;
            let filename = `${key}.html`;
            let title = `${key} Page`
            page = {
                entry,template,filename,title
            };
        }
        if(!page.chunks){
            page.chunks=['vendors',key]
        }
        entrys[key] = page.entry;
        let options = {
            title:page.title,
            template:page.template,
            filename:page.filename,
            chunks:page.chunks,
            commonCssLink:defaultHtmlOptions.commonCssLink,
            favicon:defaultHtmlOptions.favicon,
            minify:defaultHtmlOptions.minify,
            
        }
        HTMLPlugins.push(new HtmlWebpackPlugin(options))
    }
    return {entrys,HTMLPlugins}
}

const {entrys,HTMLPlugins} = getEntrys(pages);

const baseConf={
    entry:{
        ...entrys
    },
    optimization: {
        splitChunks: {
            automaticNameDelimiter: '.',
            cacheGroups:{
                vendors: {
                    name:"vendors",
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
        ...HTMLPlugins,
        new VueLoaderPlugin(),
        new webpack.HashedModuleIdsPlugin(),     //hash id 缓存
        new webpack.DefinePlugin({
            env: JSON.stringify(process.env)
        })
    ]
}

module.exports=baseConf;