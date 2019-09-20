const webpack=require("webpack");
const TerserPlugin = require('terser-webpack-plugin');
const path = require('path');
const {
    BASE_PATH,
    OUTPUT_PATH,
    OUTPUT_PATH_JS,
    resolve
} = require("./config.js");

module.exports={
    mode:"production",
    entry:{
        vendor:[
            "vue","vue-router",
            // "vuex"
        ]
    },
    output:{
        path:`${BASE_PATH}/dist/`,
        filename:`${OUTPUT_PATH_JS}[name].dll.js`,
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
                loader:"babel-loader"
            }
        ]
    },
    devtool:"none",
    resolve: {
        alias:{
            "@": resolve("src"),
            'vue':"vue/dist/vue.esm.js"
        }
    },
    plugins:[
        new webpack.DllPlugin({
            path: path.join(OUTPUT_PATH, OUTPUT_PATH_JS, '[name].manifest.json'),
            name:"[name]"
        })
    ]
}