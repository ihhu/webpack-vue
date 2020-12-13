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
            publicPath:"/",
            // hotUpdateChunkFilename:"hot/[id].hot-update.js",
            // hotUpdateMainFilename:"hot/hot-update.json",
        },
        optimization:{/*  */
            chunkIds: "named",
            moduleIds: "named"
        },
        devtool:"eval-cheap-module-source-map",
        devServer:{
            ...devServer
        },
        plugins:[
            new webpack.DefinePlugin({
                __VUE_OPTIONS_API__:true,
                __VUE_PROD_DEVTOOLS__:true,
                IS_DEV:true
            })
        ]
    };
    return merge(baseConf(env,argv),devConf)
}


module.exports = webpackConfig