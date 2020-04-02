const webpack = require("webpack");
const webpackMerge=require("webpack-merge");
const MiniCssExtractPlugin=require("mini-css-extract-plugin");
const CssUrlRelativePlugin = require('css-url-relative-plugin');
const {CleanWebpackPlugin}=require("clean-webpack-plugin");
const AddAssetHtmlPlugin=require("add-asset-html-webpack-plugin");
const TerserPlugin = require('terser-webpack-plugin');

const { PATHS,hash } = require("./config.js");

const baseConf=require("./base");
const prodConf = {
    mode:"production",
    output:{
        path:PATHS.output,
        chunkFilename:`${PATHS.out_js}[name].[${hash}].js`,
        filename:`${PATHS.out_js}[name].[${hash}].js`,
        //publicPath:"./"
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
                test:/\.css$/,
                use:[
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options:{
                            //publicPath:"../../"
                        }
                    },
                    "css-loader","postcss-loader"
                ]
            }, 
            {
                test:/\.scss$/,
                use:[
                    {
                        loader: MiniCssExtractPlugin.loader,
                    },
                    "css-loader","postcss-loader","sass-loader",
                    {
                        loader: 'sass-resources-loader',
                        options: {
                            resources: `${PATHS.entry}Style/Scss/_mixin.scss` 
                        }
                    }
                ]
            }, 
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
        new webpack.DllReferencePlugin({
            context: PATHS.base,
            manifest: require(`${PATHS.output}${PATHS.out_dll}vendor.manifest.json`),
        }),
        new AddAssetHtmlPlugin({
            filepath:`${PATHS.output}${PATHS.out_dll}*.dll.js`,
            outputPath:`${PATHS.out_js}`,
            publicPath:`${PATHS.out_js}`
        }),
        new CleanWebpackPlugin({
            cleanOnceBeforeBuildPatterns:["**/*",`!${PATHS.out_dll}*`],
        })
    ]

}

module.exports=webpackMerge(baseConf,prodConf)