const webpackMerge=require("webpack-merge");
const MiniCssExtractPlugin=require("mini-css-extract-plugin");
const CleanWebpackPlugin=require("clean-webpack-plugin");
const CssUrlRelativePlugin = require('css-url-relative-plugin')

const base=require("./base");
const BASE_PATH=process.cwd();

module.exports=webpackMerge(base,{
    mode:"production",
    output:{
        path:`${BASE_PATH}/dist/`,
        filename:"Js/[name].[hash:5].js",
        //publicPath:"./"
    },
    module:{
        rules:[
            {
                test:/\.css|scss$/,
                use:[
                    {
                        loader:MiniCssExtractPlugin.loader,
                        options:{
                            //publicPath:"../../"
                        }
                    },
                    "css-loader","postcss-loader","sass-loader"
                ]
            }, 
            {
                test: /\.(eot|svg|ttf|woff|woff2)\w*/,
                use: [{
                    loader: "file-loader",
                    options: {
                        name: "[name].[hash:5].[ext]",
                        outputPath:"Style/Font/",
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
                        outputPath:"Style/Images/",
                    }
                }]
            }
        ]
    },
    plugins:[
        //css url() relative 
        new CssUrlRelativePlugin({
            root:"./"
        }),
        new MiniCssExtractPlugin({
            filename:"Style/Css/[name].[hash:5].css"
        }),
        new CleanWebpackPlugin()
    ]

})