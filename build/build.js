process.env.NODE_ENV = "production";
const path = require("path")
const { spawn } = require('child_process');

const chalk = require("chalk");
const webpack = require("webpack");

const { parseArgs } = require("./utils.js");


const dev = {
    argv:{},
    pack(type){
        const argv = this.argv;
        argv.devServer = false;

        // 设置Babel环境变量
        process.env.BABEL_ENV = type; 
        const fnWebpackConfig = require(`./webpack.${type}.config.js`);

        const config = fnWebpackConfig(argv.env,argv);
        const compiler = webpack(config);

        return new Promise((resolve, reject) =>{
            compiler.run((err,stats)=>{
                if(err){
                    reject(err.stack || err)
                    return;
                }
                if(stats.hasErrors()){
                    reject(stats.toString({
                        chunks: false,
                        colors: true 
                    }))
                    return;
                }
                console.log(stats.toString({
                    chunks: false,
                    colors: true
                }));
                console.log(`${chalk.green(`\ntime：${(stats.endTime - stats.startTime) / 1000} s`)}\n${chalk.white(`${type} 进程编译完毕`)}\n`);
                resolve(true);
            })
        })
    },
    // 编译渲染进程
    buildRenderer(){
        return this.pack("renderer");
    },
    // 编译主进程
    buildMain(){
        return this.pack("main");
    },
    // 打包
    buildElectron(){
        const electronBuilder = require('electron-builder');
        return electronBuilder.build().then(() => {
            console.log(`\n${chalk.white(`electron 打包完成`)}\n`);
        })
    },
    // 启动调试
    async buildStart(){
        try{
            await this.buildRenderer();
            await this.buildMain();
            await this.buildElectron();
            this.buildEnd();
        }catch(err){
            console.log(chalk.red(err));
            process.exit();
        }
    },
    // 打包结束处理
    buildEnd() {
        // 打开文件管理器
        const dirPath = path.join(process.cwd(),  'dist');
        if (process.platform === 'darwin') {
            spawn('open', [dirPath]);
        } else if (process.platform === 'win32') {
            spawn('explorer', [dirPath]);
        } else if (process.platform === 'linux') {
            spawn('nautilus', [dirPath]);
        }
    },
    run(){
        let argv = parseArgs(process.argv);
        this.argv = {...this.argv,...argv};
        console.log(this.argv);
        this.buildStart();
    }
};

dev.run();