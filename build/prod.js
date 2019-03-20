const MiniCssExtractPlugin=require("mini-css-extract-plugin");
const CleanWebpackPlugin=require("clean-webpack-plugin");

const webpackMerge=require("webpack-merge");
const base=require("./base");
const BASE_PATH=process.cwd();

module.exports=webpackMerge(base,{
    mode:"production",
    output:{
        path:`${BASE_PATH}/dist/`,
        filename:"Js/[name].[hash:5].js"
    },
    module:{
        rules:[
            {
                test:/\.css|scss$/,
                use:[
                    {
                        loader:MiniCssExtractPlugin.loader
                    },
                    "css-loader","postcss-loader","sass-loader"
                ]
            }, 
            {
                test: /\.(eot|svg|ttf|woff|woff2)\w*/,
                use: [{
                    loader: "file-loader",
                    options: {
                        name: "Style/Css/[name].[hash:5].[ext]",
                        publicPath: "/dist/",
                    }
                }]
            }, 
            {
                test: /\.(jpg|jpeg|png|gif|svg|ico)$/i,
                use: [{
                    loader: "url-loader",
                    options: {
                        name: "Style/Images/[name].[hash:5].[ext]",
                        limit: 8192,
                        publicPath: "/dist/",
                    }
                }]
            }
        ]
    },
    plugins:[
        new MiniCssExtractPlugin({
            filename:"Style/Css/[name].[hash:5].css"
        }),
        new CleanWebpackPlugin()
    ]

})