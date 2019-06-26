const webpack = require("webpack");
const webpackMerge=require("webpack-merge");
const MiniCssExtractPlugin=require("mini-css-extract-plugin");
const CssUrlRelativePlugin = require('css-url-relative-plugin');
const {CleanWebpackPlugin}=require("clean-webpack-plugin");
const AddAssetHtmlPlugin=require("add-asset-html-webpack-plugin");
const TerserPlugin = require('terser-webpack-plugin');

const base=require("./base");
const {BASE_PATH,OUTPUT_PATH,OUTPUT_PATH_JS,OUTPUT_PATH_CSS,OUTPUT_PATH_FONT,OUTPUT_PATH_IMAGE} = require("./config.js");

module.exports=webpackMerge(base,{
    mode:"production",
    output:{
        path:OUTPUT_PATH,
        filename:`${OUTPUT_PATH_JS}[name].[hash:5].js`,
        //publicPath:"./"
    },
    optimization:{
        minimizer:[
            new TerserPlugin({
                cache:true,
                parallel:true,
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
                test:/\.css|scss$/,
                use:[
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options:{
                            //publicPath:"../../"
                        }
                    },
                    "css-loader","postcss-loader","sass-loader"
                ]
            }, 
            {
                test: /\.(eot|ttf|woff|woff2)\w*/,
                use: [{
                    loader: "file-loader",
                    options: {
                        name: "[name].[hash:5].[ext]",
                        outputPath: OUTPUT_PATH_FONT,
                    }
                }]
            }, 
            {
                test: /\.(jpg|jpeg|png|gif|svg|ico)$/i,
                use: [{
                    loader: "url-loader",
                    options: {
                        name: "[name].[hash:5].[ext]",
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
            filename:`${OUTPUT_PATH_CSS}[name].[hash:5].css`,
            chunkFilename:`${OUTPUT_PATH_CSS}[name].[hash:5].css`
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

})