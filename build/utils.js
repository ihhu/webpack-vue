const path=require("path");
const os = require('os');
const portfinder = require("portfinder")

// 获取ip地址
function getIPAdress() {
    let interfaces = os.networkInterfaces();
    let address = [];
    for (let devName in interfaces) {
        let iface = interfaces[devName];
        for (let i = 0; i < iface.length; i++) {
            let alias = iface[i];
            if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
                address.push(alias.address);
            }
        }
    }
    return address;
}

// 解析argv参数值
function parseArgs(argv){
    let isBegin = false;
    let _data = {};
    let _reg = /^--/g;
    argv.forEach((value,index)=>{
        if(index === 0){
            return;
        } 
        let prevValue = argv[index - 1];
        let curValue = value.replace(_reg,"");
        curValue = curValue.split("=");
        if(_reg.test(value)){
            isBegin = true;
            if(curValue[1]){
                _data[curValue[0]] = curValue[1]; 
            }else{
                _data[curValue[0]] = _data[curValue[0]]||true; 
            }
        }else if(isBegin&&_reg.test(prevValue)){
            prevValue = prevValue.replace(_reg,"");
            if(_data[prevValue] === true){
                _data[prevValue] = {};
            }
            let _old = _data[prevValue];
            if(curValue[1]){
                _data[prevValue] = {
                    ..._old,
                    [curValue[0]]:curValue[1]
                };
            }else{
                _data[prevValue] = {
                    ..._old,
                    [curValue[0]]:true
                };
            } 
        }
    })
    return _data;
}

// 获取端口
async function getPort(basePort= 8080){
    let port = basePort;
    portfinder.basePort = basePort;
    port = await portfinder.getPortPromise();
    return port;
}

const untils={
    getIPAdress,
    getPort,
    parseArgs
} 

module.exports=untils;

/* var path = require('path')
var config = require('../config')
var ExtractTextPlugin = require('extract-text-webpack-plugin')

exports.assetsPath = function (_path) {
  var assetsSubDirectory = process.env.NODE_ENV === 'production'
    ? config.build.assetsSubDirectory
    : config.dev.assetsSubDirectory
  return path.posix.join(assetsSubDirectory, _path)
}

exports.cssLoaders = function (options) {
  options = options || {}

  var cssLoader = {
    loader: 'css-loader',
    options: {
      minimize: process.env.NODE_ENV === 'production',
      sourceMap: options.sourceMap
    }
  }

  // generate loader string to be used with extract text plugin
  function generateLoaders (loader, loaderOptions) {
    var loaders = [cssLoader]
    if (loader) {
      loaders.push({
        loader: loader + '-loader',
        options: Object.assign({}, loaderOptions, {
          sourceMap: options.sourceMap
        })
      })
    }

    // Extract CSS when that option is specified
    // (which is the case during production build)
    if (options.extract) {
      return ExtractTextPlugin.extract({
        use: loaders,
        fallback: 'vue-style-loader'
      })
    } else {
      return ['vue-style-loader'].concat(loaders)
    }
  }

  // https://vue-loader.vuejs.org/en/configurations/extract-css.html
  return {
    css: generateLoaders(),
    postcss: generateLoaders(),
    less: generateLoaders('less'),
    sass: generateLoaders('sass', { indentedSyntax: true }),
    scss: generateLoaders('sass'),
    stylus: generateLoaders('stylus'),
    styl: generateLoaders('stylus')
  }
}

// Generate loaders for standalone style files (outside of .vue)
exports.styleLoaders = function (options) {
  var output = []
  var loaders = exports.cssLoaders(options)
  for (var extension in loaders) {
    var loader = loaders[extension]
    output.push({
      test: new RegExp('\\.' + extension + '$'),
      use: loader
    })
  }
  return output
} */