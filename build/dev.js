const webpack = require("webpack");
const {merge}=require("webpack-merge");
const { PATHS, devServer } = require("./config.js");
function webpackConfig(env,argv){
    const baseConf=require("./base");
    const devConf={
        mode:"development",
        output:{
            path:PATHS.output,
            chunkFilename:`${PATHS.out_js}[name].js`,
            filename:`${PATHS.out_js}[name].js`,
            publicPath:"/"
        },
        optimization:{
        },
        module:{
            rules:[
                {
                    test: /\.(eot|ttf|woff|woff2)\w*/,
                    use: [{
                        loader: "file-loader",
                        options: {
                            name: "[name].[ext]",
                            outputPath: PATHS.out_font,
                        }
                    }]
                }
            ]
        },
        devtool:"cheap-module-eval-source-map",
        plugins:[
        ],
        devServer:{
            ...devServer
        },
        plugins:[
            new webpack.DefinePlugin({
                IS_DEV: JSON.stringify(true)
            })
        ]
    };
    return merge(baseConf(env,argv),devConf)
}


module.exports = webpackConfig