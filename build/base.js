const VueLoaderPlugin=require("vue-loader/lib/plugin");
const HtmlWebpackPlugin=require("html-webpack-plugin");

const path=require("path");
const BASE_PATH=process.cwd();
const resolve = dir => path.join(__dirname, "..", dir);

module.exports={
    entry:{
        main:`${BASE_PATH}/src/main.js`
    },
    module:{
        rules:[
            {
                test:/\.js$/,
                exclude:[/node_modules/],
                loader:"babel-loader"
            },
            {
                test:/\.vue$/,
                loader:"vue-loader"
            },
            {
                test:/\.html$/,
                use:[
                    {
                        loader:"html-loader",
                        options:{
                            minimize:true
                        }
                    }
                ]
            }
        ]
    },
    resolve:{
        alias:{
            "vue":"vue/dist/vue.esm.js",
            "@": resolve("src")
        },
        modules: [
            resolve("src"),
            resolve("node_modules")
        ]
    },
    plugins:[
        new VueLoaderPlugin(),
        new HtmlWebpackPlugin({
            filename:`./index.html`,
            template:`${BASE_PATH}/public/Index.html`
        })
    ]
}