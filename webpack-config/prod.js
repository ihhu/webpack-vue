const webpackMerge=require("webpack-merge");
const HtmlWebpackPlugin=require("html-webpack-plugin");
const ExtractTextPlugin=require("extract-text-webpack-plugin");
const UglifyJSPlugin=require("uglifyjs-webpack-plugin");
const CleanWebpackPlugin=require("clean-webpack-plugin");
const base=require("./base");

const path=require("path");
const BASE_PATH=process.cwd();

module.exports=webpackMerge(base,{
    mode: 'production',
    output:{
        path:`${BASE_PATH}/dist/`,
        filename:"bundle.[chunkhash].js",
        publicPath:`./`
    },
    module:{
        rules:[
            {
                test:/\.scss$/,
                exclude:[/node_modules/],
                use:ExtractTextPlugin.extract({
                    fallback:"style-loader",
                    use:[
                        {
                            loader:"css-loader",
                            options:{
                                minimize:true
                            }
                        },
                        "postcss-loader",
                        "sass-loader"
                    ]
                })
            }
        ]
    },
    plugins:[
        new ExtractTextPlugin({
            filename:"bundle.[chunkhash].css"
        }),
        new UglifyJSPlugin({
            compress: {
                warnings: false,
            },
            output: {
                comments: false
            }
        }),
        new CleanWebpackPlugin(["dist"],{
            root:`${BASE_PATH}`,
            exclude:[]
        })
    ],
    resolve:{
        alias:{
            config:path.resolve(__dirname,"./../src/config/prod.js")
        }
    }
})