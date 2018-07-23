const HtmlWebpackPlugin=require("html-webpack-plugin");
const path=require("path");
const BASE_PATH=process.cwd();

module.exports={
    //common config
    entry:`${BASE_PATH}/src/index.js`,
    plugins:[
        new HtmlWebpackPlugin({
            filename:"index.html",
            template:`${BASE_PATH}/src/index.html`,
            favicon:`${BASE_PATH}/src/favicon.ico`
        })
    ],
    module:{
        rules:[
            {
                test:/\.js$/,
                exclude:[/node_modules/],
                loader:"babel-loader"
            },
            {
                test:/\.html$/,
                loader:"html-loader",
                options:{
                    minimize:true
                }
            },
            {
                test:/\.(jpe?g|png|gif|svg|ico)$/i,
                loader:"url-loader",
                options:{
                    limit:10000,
                    hash:"sha512",
                    publicPath:"/",
                    name:"assets/images/[hash].[ext]"
                }
            }
        ]
    },
    resolve:{
        extensions:[".js"],
        alias:{
            src:path.resolve(__dirname,"./../src")
        }
    }
}

