const webpackMerge=require("webpack-merge");
const base=require("./base");
const BASE_PATH=process.cwd();

module.exports=webpackMerge(base,{
    mode:"development",
    output:{
        path:`${BASE_PATH}/dist/`,
        filename:"Js/app.[name].js"
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
                test: /\.(eot|svg|ttf|woff|woff2)\w*/,
                use: [{
                    loader: "file-loader",
                    options: {
                        name: "[name].[hash:5].[ext]",
                        outputPath: "Style/Css/",
                    }
                }]
            }, 
            {
                test: /\.(jpg|jpeg|png|gif|svg|ico)$/i,
                use: [{
                    loader: "url-loader",
                    options: {
                        name: "[name]-[hash:5].[ext]",
                        limit: 8192,
                        outputPath: "Style/Images/",
                    }
                }]
            }
        ]
    },
    //devtool:"eval-source-map",
    devtool:"none",
    plugins:[
    ],
    devServer:{
        compress:true,
        //open:true,
    }
})