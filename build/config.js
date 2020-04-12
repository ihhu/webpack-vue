const BASE_PATH=process.cwd();
const PATHS={
    base:BASE_PATH,
    entry:`${BASE_PATH}/src/`,
    output:`${BASE_PATH}/dist/`,
    out_images:"Style/Images/",
    out_font:"Style/Font/",
    out_js:"JS/",
    out_dll:"dll/",
    out_css:"Style/Css/",
    views:`${BASE_PATH}/public/pages/`,
    "node_modules":`${BASE_PATH}/node_modules/`
}

const pages = {
    main:{
        // page 的入口
        entry:`${PATHS.entry}main.js`,
        // template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
        title:"主页",
        // 在 dist/index.html 的输出
        filename:"index.html",
        // 模板来源
        template:`${PATHS.views}Index.ejs`
        // 提取出来的通用 chunk 和 vendor chunk。
        // chunks:[]
    }
}

const config = {
    PATHS,
    devServer:{
        compress:true,
        // host:"0.0.0.0",
        proxy:{
        },
        stats: {
            colors: true,
        },
        overlay: true,
        hot: true,
        inline:true,
        open:true
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
    pages,
    hash:"contenthash:5",
    commonCssLink:[]
}
module.exports= config;