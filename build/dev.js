const webpack = require("webpack");
const webpackMerge=require("webpack-merge");

const base=require("./base");
const {BASE_PATH,OUTPUT_PATH,OUTPUT_PATH_JS,OUTPUT_PATH_FONT,OUTPUT_PATH_IMAGE} = require("./config.js");

module.exports=webpackMerge(base,{
    mode:"development",
    output:{
        path:OUTPUT_PATH,
        filename:`${OUTPUT_PATH_JS}app.[name].js`
    },
    optimization:{
    },
    module:{
        rules:[
            {
                test: /\.css|scss$/,
                use:[
                    {
                        loader:"style-loader",
                        options:{
                            sourceMap:true
                        }
                    },
                    {
                        loader:"css-loader",
                        options:{
                            sourceMap:true
                        }
                    },
                    {
                        loader:"postcss-loader",
                        options:{
                            sourceMap:true
                        }
                    },
                    {
                        loader:"sass-loader",
                        options:{
                            sourceMap:true
                        }
                    }
                ]
            }, 
            {
                test: /\.(eot|ttf|woff|woff2)\w*/,
                use: [{
                    loader: "file-loader",
                    options: {
                        name: "[name].[ext]",
                        outputPath: OUTPUT_PATH_FONT,
                    }
                }]
            }, 
            {
                test: /\.(jpg|jpeg|png|gif|svg|ico)$/i,
                use: [{
                    loader: "url-loader",
                    options: {
                        name: "[name].[ext]",
                        limit: 8192,
                        outputPath: OUTPUT_PATH_IMAGE,
                    }
                }]
            }
        ]
    },
    devtool:"eval-source-map",
    //devtool:"none",
    plugins:[
    ],
    devServer:{
        compress:true,
        //open:true,
    },
    plugins:[
        new webpack.DefinePlugin({
            IS_DEV: JSON.stringify(true)
        })
    ]
})