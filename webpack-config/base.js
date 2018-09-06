const HtmlWebpackPlugin=require("html-webpack-plugin");
const path=require("path");
const BASE_PATH=process.cwd();

module.exports={
    //common config
    entry:`${BASE_PATH}/src/index.js`,
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
                test:/\.(jpg|jpeg|png|gif|svg|ico)$/i,
                use:[
                    {
                        loader:"url-loader",
                        options:{
                            name:"Style/Images/[name]-[hash:5].[ext]",
                            limit: 8,
                            publicPath: "/",
                            outputPath: "/"
                        }
                    }
                ]
            }
        ]
    },
    plugins:[
        new HtmlWebpackPlugin({
            filename:"index.html",
            template:`${BASE_PATH}/src/index.html`,
            favicon:`${BASE_PATH}/src/favicon.ico`
        })
    ],
    resolve:{
        extensions:[".js"],
        alias:{
            src:path.resolve(__dirname,"./../src")
        }
    }
}

