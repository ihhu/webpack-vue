const webpack = require("webpack");
const webpackMerge=require("webpack-merge");
let env=null;
const {
    BASE_PATH,
    ENTRY_PATH,
    OUTPUT_PATH,
    OUTPUT_PATH_JS,
    OUTPUT_PATH_FONT,
    OUTPUT_PATH_IMAGE
} = require("./config.js");

function webpackConfig(env){
    const baseConf=require("./base");
    const devConf={
        mode:"development",
        output:{
            path:OUTPUT_PATH,
            chunkFilename:`${OUTPUT_PATH_JS}[name].js`,
            filename:`${OUTPUT_PATH_JS}app.[name].js`
        },
        optimization:{
        },
        module:{
            rules:[
                {
                    test: /\.css$/,
                    use:[
                        {
                            loader:"style-loader"
                        },
                        {
                            loader:"css-loader",
                            options:{sourceMap:true}
                        },
                        {
                            loader:"postcss-loader",
                            options:{sourceMap:true}
                        }
                    ]
                }, 
                {
                    test: /\.scss$/,
                    use:[
                        {
                            loader:"style-loader"
                        },
                        {
                            loader:"css-loader",
                            options:{sourceMap:true}
                        },
                        {
                            loader:"postcss-loader",
                            options:{sourceMap:true}
                        },
                        {
                            loader:"sass-loader",
                            options:{
                                sourceMap:true,
                            }
                        },
                        {
                            loader: 'sass-resources-loader',
                            options: {
                                sourceMap: true,
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
        devtool:"cheap-module-eval-source-map",
        plugins:[
        ],
        devServer:{
            compress:true,
            proxy:{
            }
            //open:true,
        },
        plugins:[
            new webpack.DefinePlugin({
                IS_DEV: JSON.stringify(true),
                IS_MOCK:env.mock,
                env:JSON.stringify(env)
            })
        ]
    };
    return webpackMerge(baseConf,devConf)
}


module.exports= webpackConfig