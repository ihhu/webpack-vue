module.exports ={
    "presets":[
        ["@babel/preset-env",{
            "modules": false
        }],                
        ["@babel/preset-typescript",{
            "isTSX":true,
            "allExtensions":true
        }]
    ],
    "plugins":[
        "@babel/plugin-proposal-class-properties",
        ["@vue/babel-plugin-jsx",{
            "optimize":true
        }],
        ["@babel/plugin-transform-runtime",{
            "useESModules":true,
            "corejs":{
                "version": 3,
                "proposals": true
            }
        }]
    ]

}