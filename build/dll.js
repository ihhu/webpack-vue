const webpack=require("webpack");
const TerserPlugin = require('terser-webpack-plugin');
const path = require('path');

const { PATHS, resolves } = require("./config.js");

module.exports={
    mode:"production",
    entry:{
        vendor:["vue","vue-router","vuex"],
    },
    output:{
        path:`${PATHS.output}`,
        filename:`${PATHS.out_dll}[name].dll.js`,
        library:"[name]"
    },
    optimization:{
        minimizer:[
            new TerserPlugin({
                cache:true,
                parallel:true, // 开启多线程压缩
                terserOptions:{
                    compress:{
                        drop_console:true,
                        hoist_vars:true,
                        reduce_vars:true,
                        hoist_funs:true,
                        dead_code:true
                    },
                    output:{
                        ascii_only:true,
                    }
                }
            })
        ]
    },
    module:{
        rules:[
            {
                test:/\.js$/,
                exclude:[/node_modules/],
                loader:"babel-loader"
            }
        ]
    },
    devtool:"none",
    resolve: {
        ...resolves
    },
    plugins:[
        new webpack.DllPlugin({
            path: path.join(PATHS.output, PATHS.out_dll, '[name].manifest.json'),
            name:"[name]"
        })
    ]
}