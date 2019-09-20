const webpack = require("webpack");
const webpackMerge=require("webpack-merge");
const MiniCssExtractPlugin=require("mini-css-extract-plugin");
const CssUrlRelativePlugin = require('css-url-relative-plugin');
const {CleanWebpackPlugin}=require("clean-webpack-plugin");
const AddAssetHtmlPlugin=require("add-asset-html-webpack-plugin");
const TerserPlugin = require('terser-webpack-plugin');

const {
    BASE_PATH,
    OUTPUT_PATH,
    OUTPUT_PATH_JS,
    OUTPUT_PATH_CSS,
    OUTPUT_PATH_FONT,
    OUTPUT_PATH_IMAGE,
    ENTRY_PATH
} = require("./config.js");

const baseConf=require("./base");
const prodConf = {
    mode:"production",
    output:{
        path:OUTPUT_PATH,
        chunkFilename:`${OUTPUT_PATH_JS}[name].[contenthash:5].js`,
        filename:`${OUTPUT_PATH_JS}[name].[contenthash:5].js`,
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
                            resources: `${ENTRY_PATH}Style/Scss/_mixin.scss` 
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
                        outputPath: OUTPUT_PATH_FONT,
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
                        outputPath: OUTPUT_PATH_IMAGE,
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
            filename:`${OUTPUT_PATH_CSS}[name].[contenthash:5].css`,
            chunkFilename:`${OUTPUT_PATH_CSS}[name].[contenthash:5].css`
        }),
        new webpack.DllReferencePlugin({
            context: BASE_PATH,
            manifest: require("../dist/JS/vendor.manifest.json"),
        }),
        new AddAssetHtmlPlugin({
            filepath:`${BASE_PATH}/dist/JS/*.dll.js`,
            outputPath:`./JS/`,
            publicPath:"JS"
        }),
        new CleanWebpackPlugin({
            cleanOnceBeforeBuildPatterns:["**/*","!JS","!JS/*.manifest.json","!JS/*.dll.js"],
        })
    ]

}

module.exports=webpackMerge(baseConf,prodConf)