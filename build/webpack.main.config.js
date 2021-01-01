// 设置Babel环境变量
process.env.BABEL_ENV = "main"; 

const webpack = require('webpack');
const { merge }=require("webpack-merge");

const { CleanWebpackPlugin }=require("clean-webpack-plugin");
const TerserPlugin = require('terser-webpack-plugin');

const config =  require("./config.js");
const { 
    target,
    entry,
    paths, 
    resolves, 
} = config.main



function webpackConfig(env,argv){   
    
    const IS_DEV = env.mode !== 'production';

    // webpack base config 
    const baseConf = {
        mode: IS_DEV ? "development" : "production",
        target,
        entry,
        output:{
            path:paths.output,
            chunkFilename:`${paths.out_js}[name].js`,
            filename:`${paths.out_js}[name].js`,
            publicPath:"/"
        },
        stats: {
            colors: true
        },
        optimization: {
            splitChunks: {
                maxInitialRequests:Infinity,
                automaticNameDelimiter: '.',
                cacheGroups:{
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
                }
            ]
        },
        resolve:{
            ...resolves
        },
        plugins:[
            new webpack.DefinePlugin({
                IS_DEV
            })
        ]
    }
    // wepback development config
    const devConf = {
        devtool:false,
        watchOptions: {
            ignored: "node_modules/**"
        },
        plugins:[]
    }
    // wepback production config
    const prodConf = {
        optimization:{
            minimize: true,
            minimizer:[
                new TerserPlugin({
                    // 启用/禁用提取注释 默认值：true
                    extractComments:false,
                    terserOptions:{
                        compress:{
                            hoist_vars:true,
                            reduce_vars:true,
                            hoist_funs:true,
                            dead_code:true
                        }
                    }
                })
            ]
        },
        plugins:[]

    }
    // 
    if(IS_DEV||!!argv.config){
        baseConf.plugins.push(
            new CleanWebpackPlugin({
                cleanOnceBeforeBuildPatterns:["**/*"]
            })
        )
    }else{
        baseConf.plugins.push(
            new CleanWebpackPlugin({
                cleanOnceBeforeBuildPatterns:["**/*",`${paths.base}/dist/**`]
            })
        )
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
    if(IS_DEV&&argv.devServer){
        devConf.plugins.push(
            new webpack.DefinePlugin({
                DEV_SERVER:JSON.stringify(argv.devServer)
            })
        )
    }else{
        prodConf.plugins.push(
            new webpack.DefinePlugin({
                DEV_SERVER:false
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