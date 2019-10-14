const webpack = require("webpack");
const webpackMerge=require("webpack-merge");
const MiniCssExtractPlugin=require("mini-css-extract-plugin");
const CssUrlRelativePlugin = require('css-url-relative-plugin');
const {CleanWebpackPlugin}=require("clean-webpack-plugin");
const AddAssetHtmlPlugin=require("add-asset-html-webpack-plugin");
const TerserPlugin = require('terser-webpack-plugin');

const { PATHS } = require("./config.js");

const baseConf=require("./base");
const prodConf = {
    mode:"production",
    output:{
        path:PATHS.output,
        chunkFilename:`${PATHS.out_js}[name].[contenthash:5].js`,
        filename:`${PATHS.out_js}[name].[contenthash:5].js`,
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
                        name: "[name].[contenthash:5].[ext]",
                        outputPath: PATHS.out_font,
                    }
                }]
            }, 
            {
                test: /\.(jpg|jpeg|png|gif|svg|ico)$/i,
                use: [{
                    loader: "url-loader",
                    options: {
                        name: "[name].[contenthash:5].[ext]",
                        limit: 8192,
                        outputPath: PATHS.out_images,
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
            filename:`${PATHS.out_css}[name].[contenthash:5].css`,
            chunkFilename:`${PATHS.out_css}[name].[contenthash:5].css`
        }),
        new webpack.DllReferencePlugin({
            context: PATHS.base,
            manifest: require(`${PATHS.output}/JS/vendor.manifest.json`),
        }),
        new AddAssetHtmlPlugin({
            filepath:`${PATHS.output}/JS/*.dll.js`,
            outputPath:`./JS/`,
            publicPath:"JS"
        }),
        new CleanWebpackPlugin({
            cleanOnceBeforeBuildPatterns:["**/*","!JS","!JS/*.manifest.json","!JS/*.dll.js"],
        })
    ]

}

module.exports=webpackMerge(baseConf,prodConf)