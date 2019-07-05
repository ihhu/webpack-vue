const webpack=require("webpack");
const path = require('path');
const {BASE_PATH,OUTPUT_PATH,OUTPUT_PATH_JS} = require("./config.js");
const resolve = dir => path.join(__dirname, "..", dir);

module.exports={
    mode:"production",
    entry:{
        vendor:["vue","vue-router"]
    },
    output:{
        path:`${BASE_PATH}/dist/`,
        filename:`${OUTPUT_PATH_JS}[name].dll.js`,
        library:"[name]"
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