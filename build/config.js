const BASE_PATH = process.cwd();

// ======================================
// ======================================
// basePath
const basePath = {
  base: BASE_PATH,
  out_images: 'assets/images/',
  out_font: 'assets/font/',
  out_js: 'js/',
  out_dll: 'dll/',
  out_css: 'assets/css/',
  public: `${BASE_PATH}/public/`,
  'node_modules': 'node_modules'
};
// web paths
const webPaths = {
  ...basePath,
  entry: `${BASE_PATH}/src/`,
  output: `${BASE_PATH}/dist/`,
  page: `${BASE_PATH}/src/pages/`,
};

// ======================================
// ======================================
// dev server config
const devServer = {
  historyApiFallback:true,
  client:{
    overlay: true,
    progress:true
  },
  hot: true,
  open:true,
  devMiddleware:{
    publicPath:'/'
  },
  allowedHosts:'all'
};


// ======================================
// ======================================
// web config
const webConfig = {
  target: 'web',
  paths: webPaths,
  devServer:{
    ...devServer,
    // host:"0.0.0.0",
    proxy:[
      {
        context: ['/api/**'],
        target:'http://localhost',
        changeOrigin: true,
        secure: false
      }
    ]
  },
  resolves:{
    alias:{
      '@': `${basePath.base}/src`,
      '@assets': '@/assets'
    },
    modules: [
      basePath.base,
      webPaths.node_modules
    ],
    extensions: ['.ts', '.tsx', '.js', '.json','.vue']
  },
  hash:'.[contenthash:5]',
  commonCssLink:[],
  pages:{
    main:{
      entry:`${webPaths.page}index/main.tsx`,
      title:'主页',
      filename:'index.html',
      template:`${webPaths.entry}Index.ejs`
      // 提取出来的通用 chunk 和 vendor chunk。
      // chunks:[]
    }
  }
};

module.exports = {
  web: webConfig,
  renderer: {},
  main: {},
  node: {}
};