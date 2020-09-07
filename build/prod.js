const webpack = require("webpack");
const {merge}=require("webpack-merge");
const MiniCssExtractPlugin=require("mini-css-extract-plugin");
const CssUrlRelativePlugin = require('css-url-relative-plugin');
const {CleanWebpackPlugin}=require("clean-webpack-plugin");
const TerserPlugin = require('terser-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const { PATHS,hash } = require("./config.js");
function webpackConfig(env,argv){
    const baseConf=require("./base");
    const prodConf = {
        mode:"production",
        output:{
            path:PATHS.output,
            chunkFilename:`${PATHS.out_js}[name].[${hash}].js`,
            filename:`${PATHS.out_js}[name].[${hash}].js`,
            publicPath:"/"
        },
        optimization:{
            minimizer:[
                new TerserPlugin({
                    cache:true,
                    parallel:true, // 开启多线程压缩
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
        module:{
            rules:[
                {
                    test: /\.(eot|ttf|woff|woff2)\w*/,
                    use: [{
                        loader: "file-loader",
                        options: {
                            name: `[name].[${hash}].[ext]`,
                            outputPath: PATHS.out_font,
                        }
                    }]
                }
            ]
        },
        plugins:[
            new webpack.DefinePlugin({
                IS_DEV: JSON.stringify(false)
            }),
            //css url() relative 
            new CssUrlRelativePlugin({
                root:"./"
            }),
            new MiniCssExtractPlugin({
                filename:`${PATHS.out_css}[name].[${hash}].css`,
                chunkFilename:`${PATHS.out_css}[name].[${hash}].css`
            }),
            new CleanWebpackPlugin({
                cleanOnceBeforeBuildPatterns:["**/*",`!${PATHS.out_dll}*`],
            })
        ]

    }

    if(env.analyzer){
        prodConf.plugins.push(new BundleAnalyzerPlugin())
    }
    
    return merge(baseConf(env,argv),prodConf)
}


module.exports=webpackConfig;