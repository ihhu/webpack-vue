# webpack-vue

基于`webpack5+ babel7+`搭建的前端打包配置环境


--- 


## 构建命令

```javascript
npm install 
npm run dev
npm run build
```

---

## `webpack`官方网址
[英文](https://webpack.js.org/) `https://webpack.js.org`

[中文](https://webpack.docschina.org/) `https://webpack.docschina.org`

---
## 从零开始配置`webapck`打包环境

### 设置打包目标浏览器
- 创建`.browserslistrc`文件
- 编辑`.browserslistrc`文件

```
last 2 versions
> 2%
```

### `.js`文件打包配置

- 安装`@babel/core @babel/preset-ent @babel-transfrom-runtime @babel-loader @babel/runtime-corejs3`依赖包
```
npm i -D @babel/core @babel/preset-ent @babel-transfrom-runtime @babel-loader @babel/runtime-corejs3
```

- 创建`babel.config.json`文件
```
{
    "presets":[
        ["@babel/preset-env",{
            "modules": false
        }]
    ],
    "plugins":[
        "@babel/plugin-proposal-class-properties",
        ["@babel/plugin-transform-runtime",{
            "useESModules":true,
            "corejs":{
                "version": 3,
                "proposals": true
            }
        }]
    ]
}
```

- `build/base.js`文件 添加`js`打包配置
```
    module:{
        rules:[
            //other rules
            //...

            {
                test:/\.js$/,
                exclude:[/node_modules/],
                loader:"babel-loader"
            }
        ]
    },
```

### `.css|.scss`文件打包配置

- 安装`css-loader style-loader postcss postcss-loader cssnano sass sass-loader autoprefixer css-url-relative-plugin mini-css-extract-plugin`依赖包
```
npm i -D css-loader style-loader postcss postcss-loader cssnano sass sass-loader autoprefixer css-url-relative-plugin mini-css-extract-plugin
```

- 创建`postcss.config.js`并编辑`postcss.config.js`文件
```
module.exports={
    plugins:{
        "autoprefixer":{},
        "cssnano":{}
    }
}
```

- `build/dev.js`文件 添加开发环境 `.css|.scss`文件打包配置
```
    module:{
        rules:[
            //other rules
            //...

            {
                test: /\.css|scss$/,
                use:[
                    {
                        loader:"style-loader",
                        options:{
                            sourceMap:true
                        }
                    },
                    {
                        loader:"css-loader",
                        options:{
                            sourceMap:true
                        }
                    },
                    {
                        loader:"postcss-loader",
                        options:{
                            sourceMap:true
                        }
                    },
                    {
                        loader:"sass-loader",
                        options:{
                            sourceMap:true
                        }
                    }
                ]
            },
        ]
    },
```

- `build/prod.js`文件 添加生产环境 `css|scss`打包配置
```
const MiniCssExtractPlugin=require("mini-css-extract-plugin");
const CssUrlRelativePlugin = require('css-url-relative-plugin');
```
```
    module:{
        rules:[
            //other rules
            //...

            {
                test:/\.css|scss$/,
                use:[
                    {
                        loader:MiniCssExtractPlugin.loader,
                        options:{
                        }
                    },
                    "css-loader","postcss-loader","sass-loader"
                ]
            }, 
        ]
    },
    plugins:[
        //other plugins
        //...

        //fix css url() relative 
        new CssUrlRelativePlugin({
            root:"./"
        }),
        new MiniCssExtractPlugin({
            filename:`${OUTPUT_PATH_CSS}[name].[hash:5].css`,
            chunkFilename:`${OUTPUT_PATH_CSS}[name].[hash:5].css`
        })
    ]
```

### 图片及字体文件打包配置
- 安装`file-loader url-loader`依赖包
```
npm i -D file-loader url-loader
```
- 修改`build/dev.js`文件 添加开发环境图片及字体文件配置
```
    module:{
        rules:[
            //other rules
            //...

            {
                test: /\.(eot|svg|ttf|woff|woff2)\w*/,
                use: [{
                    loader: "file-loader",
                    options: {
                        name: "[name].[ext]",
                        outputPath: OUTPUT_PATH_FONT,
                    }
                }]
            }, 
            {
                test: /\.(jpg|jpeg|png|gif|svg|ico)$/i,
                use: [{
                    loader: "url-loader",
                    options: {
                        name: "[name].[ext]",
                        limit: 8192,
                        outputPath: OUTPUT_PATH_IMAGE,
                    }
                }]
            }
        ]
    },
```
- 修改`build/prod.js`文件 添加生产环境图片及字体文件配置
```
    module:{
        rules:[
            //other rules
            //...

            {
                test: /\.(eot|ttf|woff|woff2)\w*/,
                use: [{
                    loader: "file-loader",
                    options: {
                        name: "[name].[hash:5].[ext]",
                        outputPath: OUTPUT_PATH_FONT,
                    }
                }]
            }, 
            {
                test: /\.(jpg|jpeg|png|gif|svg|ico)$/i,
                use: [{
                    loader: "url-loader",
                    options: {
                        name: "[name].[hash:5].[ext]",
                        limit: 8192,
                        outputPath: OUTPUT_PATH_IMAGE,
                    }
                }]
            }
        ]
    },
```