const BASE_PATH=process.cwd();
const PATHS={
    base:BASE_PATH,
    entry:`${BASE_PATH}/src/`,
    output:`${BASE_PATH}/dist/`,
    out_images:"Style/Images/",
    out_font:"Style/Font/",
    out_js:"JS/",
    out_css:"Style/Css/",
    views:`${BASE_PATH}/public/pages/`,
    "node_modules":`${BASE_PATH}/node_modules/`
}

const config = {
    PATHS,
    devServer:{
        compress:true,
        host:"0.0.0.0",
        proxy:{
        },
        stats: {
            colors: true,
        },
        overlay: true,
        hot: true,
        inline:true
    },
    resolves:{
        alias:{
            "@": PATHS.entry,
            "@JS": "@/JS",
            "@Mixins": "@/Mixins",
            "@Style": "@/Style",
            "@Store": "@/Store",
            "@Views": "@/Views",
            "@Components": "@/Components",
            "@Router": "@/Router",
            'vue':"vue/dist/vue.esm.js",
        },
        modules: [
            PATHS.entry,PATHS.node_modules
        ]
    },
}
module.exports= config;