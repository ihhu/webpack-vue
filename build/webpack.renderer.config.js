// 设置Babel环境变量
process.env.BABEL_ENV = "renderer";

const webpack = require('webpack');
const { merge }=require("webpack-merge");

const HtmlWebpackPlugin=require("html-webpack-plugin");
const MiniCssExtractPlugin=require("mini-css-extract-plugin");
const CssUrlRelativePlugin = require('css-url-relative-plugin');
const { CleanWebpackPlugin }=require("clean-webpack-plugin");
const TerserPlugin = require('terser-webpack-plugin');
const { VueLoaderPlugin }=require("vue-loader");

const config =  require("./config.js");
const { 
    target, 
    paths, 
    devServer, 
    resolves, 
    commonCssLink, 
    hash, 
    pages 
} = config.renderer

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
        favicon:`${paths.entry}favicon.ico`,
        commonCssLink:[...commonCssLink]
    };
    let entrys = {};
    let HTMLPlugins = [];
    for (let key in pages){
        let page = pages[key];
        if(typeof page === "string"){
            let entry = page;
            let template = `${paths.template}${key}.html`;
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
            description:page.description||"",
            keywords:page.keywords||""
            
        }
        HTMLPlugins.push(new HtmlWebpackPlugin(options))
    }
    return {entrys,HTMLPlugins}
}

const {entrys,HTMLPlugins} = getEntrys(pages);

function webpackConfig(env,argv){   
 
    const IS_DEV = env.mode !== 'production';
    console.log("IS_DEV:::",IS_DEV,env);

    // webpack base config 
    const baseConf = {
        target,
        entry:{
            ...entrys
        },
        stats: {
            colors: true
        },
        optimization: {
            splitChunks: {
                maxInitialRequests:Infinity,
                automaticNameDelimiter: '.',
                cacheGroups:{
                    vue: {  
                        name: "vue.common",
                        chunks: "initial",
                        test: /(vue-router)|(vue[\\/]dist[\\/]vue)|(@vue[\\/]*)/,
                        minSize:0,  
                        priority:2
                    },
                    common: {  //公共模块 
                        name: "common",
                        chunks: "initial",  //入口处开始提取代码
                        minSize:0,      //代码最小多大，进行抽离
                        minChunks:3,    //代码复 2 次以上的抽离
                        priority:0
                    },
                    defaultVendors: {
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
                    test:/\.(ts|js)x?$/,
                    exclude:[/node_modules/],
                    use:["thread-loader","babel-loader"]
                },
                {
                    test:/\.vue$/,
                    use:[
                        {
                            loader:"vue-loader",
                            options:{
                                compilerOptions:{
                                    preserveWhitespace:false
                                },
                                prettify:false
                            }
                        }
                    ],
                },
                {
                    test: /\.css$/,
                    use:[
                        {
                            loader:IS_DEV ? "style-loader" : MiniCssExtractPlugin.loader
                        },
                        {
                            loader:"css-loader",
                            options:{sourceMap:IS_DEV}
                        },
                        {
                            loader:"postcss-loader",
                            options:{sourceMap:IS_DEV}
                        }
                    ]
                }, 
                {
                    test: /\.scss$/,
                    use:[
                        {
                            loader:IS_DEV ? "style-loader" : MiniCssExtractPlugin.loader
                        },
                        {
                            loader:"css-loader",
                            options:{sourceMap:IS_DEV}
                        },
                        {
                            loader:"postcss-loader",
                            options:{sourceMap:IS_DEV}
                        },
                        {
                            loader:"sass-loader",
                            options:{sourceMap:IS_DEV}
                        },
                        {
                            loader: 'sass-resources-loader',
                            options: {
                                sourceMap:IS_DEV,
                                resources: `${paths.entry}assets/scss/_mixin.scss` 
                            }
                        }
                    ]
                },
                {
                    test:/\.less$/,
                    use:[
                        {
                            loader:IS_DEV ? "style-loader" : MiniCssExtractPlugin.loader
                        },
                        {
                            loader:"css-loader",
                            options:{sourceMap:IS_DEV}
                        },
                        {
                            loader:"postcss-loader",
                            options:{sourceMap:IS_DEV}
                        },
                        {
                            loader:"less-loader",
                            options:{
                                sourceMap:IS_DEV,
                                lessOptions:{
                                    javascriptEnabled: true,
                                    modifyVars: {
                                        
                                    }
                                }
                            }
                        }
                    ]
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
                }, 
                {
                    test: /\.(eot|ttf|woff|woff2)\w*/,
                    type: 'asset/resource',
                    generator: {
                        filename: `${paths.out_font}[name]${hash}[ext]`
                    }
                },
                {
                    test: /\.(jpg|jpeg|png|gif|svg|ico)$/i,
                    type:"asset",
                    parser: {
                        dataUrlCondition: {
                          maxSize: 8 * 1024 // 8kb
                        }
                    },
                    generator: {
                        filename(pathData){
                            // 处理图片路径，防止不同目录重名情况
                            let filename = pathData.filename;
                            let _path = filename;
                            if(/^.*images(\\|\/)/g.test(filename)){
                                _path= filename.replace(/^.*images(\\|\/)/g,"").replace(/\..*$/g,"").replace(/\\/g,"/")
                            }else{
                                _path= filename.replace(/^.*(\\|\/)/g,"").replace(/\..*$/g,"").replace(/\\/g,"/")
                            }
                            return `${paths.out_images}${_path}${hash}[ext]`;
                        }
                    }
                }
            ]
        },
        resolve:{
            ...resolves
        },
        plugins:[
            ...HTMLPlugins, 
            new VueLoaderPlugin()
        ]
    }

    // wepback development config
    const devConf = {
        mode:"development",
        output:{
            path:paths.output,
            chunkFilename:`${paths.out_js}[name].js`,
            filename:`${paths.out_js}[name].js`,
            publicPath:"/",
        },
        optimization:{
            chunkIds: "named",
            moduleIds: "named"
        },
        devtool:"eval-cheap-module-source-map",
        devServer:{
            ...devServer
        },
        plugins:[
            new webpack.DefinePlugin({
                __VUE_OPTIONS_API__:true,
                __VUE_PROD_DEVTOOLS__:true,
                IS_DEV:true
            })
        ]
    }

    // wepback production config
    const prodConf = {
        mode:"production",
        output:{
            path:paths.output,
            chunkFilename:`${paths.out_js}[name]${hash}.js`,
            filename:`${paths.out_js}[name]${hash}.js`,
            publicPath:"./"
        },
        optimization:{
            minimize: true,
            minimizer:[
                new TerserPlugin({
                    // 启用/禁用提取注释 默认值：true
                    extractComments:false,
                    terserOptions:{
                        compress:{
                            drop_console:true,
                            hoist_vars:true,
                            reduce_vars:true,
                            hoist_funs:true,
                            dead_code:true
                        },
                        output:{
                            ascii_only:true,
                        }
                    }
                })
            ]
        },
        plugins:[
            new webpack.DefinePlugin({
                __VUE_OPTIONS_API__:true,
                __VUE_PROD_DEVTOOLS__:false,
                IS_DEV: false
            }),
            //css url() relative 
            new CssUrlRelativePlugin({
                root:"./"
            }),
            new MiniCssExtractPlugin({
                filename:`${paths.out_css}[name]${hash}.css`,
                chunkFilename:`${paths.out_css}[name]${hash}.css`
            }),
            new CleanWebpackPlugin({
                cleanOnceBeforeBuildPatterns:["**/*",`!${paths.out_dll}*`],
            })
        ]

    }

    // 显示编译进度
    if(argv.progress){
        const isProfile = argv.progress === 'profile';
        baseConf.plugins.push(
            new webpack.ProgressPlugin({
                profile: isProfile
            })
        )
    }

    if(IS_DEV){
        return merge(baseConf, devConf);
    }else{
        return merge(baseConf, prodConf);
    }
}

module.exports = webpackConfig;