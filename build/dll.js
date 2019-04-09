const webpack=require("webpack");
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const path = require('path');
const BASE_PATH=process.cwd();
const resolve = dir => path.join(__dirname, "..", dir);

module.exports={
    mode:"production",
    entry:{
        vendor:["vue","vue-router"]
    },
    output:{
        path:`${BASE_PATH}/dist/`,
        filename:"JS/[name].dll.js",
        library:"[name]"
    },
    module:{
        rules:[
            {
                test:/\.js$/,
                loader:"babel-loader"
            },
            {
                test:/\.vue$/,
                loader:"vue-loader"
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
        new VueLoaderPlugin(),
        new webpack.DllPlugin({
            path: path.join(BASE_PATH, 'dist/JS', '[name].manifest.json'),
            name:"[name]"
        })
    ]
}