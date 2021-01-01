process.env.NODE_ENV = 'development';
const path = require('path')
const { spawn } = require('child_process');

const chalk = require("chalk");
const webpack = require("webpack");
const WebpackDevServer = require("webpack-dev-server");
const electron = require('electron');

const { parseArgs, getPort } = require("./utils.js");


const dev = {
    argv:{},
    timer:null,
    isRelaunch:false,
    electronProcess:null,
    devServerConfig:{},
    // 美化Electron输出
    electronLog(data, color) {
        let log = '';
        data.toString().split(/\r?\n/).forEach(line => log += `\n${line}`);
        if (/[0-9A-z]+/.test(log)) {
            console.log(
                chalk[color].bold('┏ Electron -------------------') +
                log +
                chalk[color].bold('┗ ----------------------------')
            )
        }
    },
    // 启动electron
    startElectron(){
        let args = ['--inspect=5858',path.join(process.cwd(), 'app/main/main.js')]
        let options = {};
        const electronProcess = spawn(electron,args,options);
        //'--inspect=5858',
        electronProcess.stdout.on('data', data => {
            this.electronLog(data, 'blue')
        });
        electronProcess.stderr.on('data', data => {
            this.electronLog(data, 'red')
        });
        electronProcess.on('close', () => {
            if (!this.isRelaunch) process.exit()
        });
        this.electronProcess = electronProcess;

    },
    relaunchElectron(){
        let electronProcess = this.electronProcess;                
        // 重启electron
        if(electronProcess && electronProcess.pid){
            this.isRelaunch = true;
            process.kill(electronProcess.pid)
            this.electronProcess = null;
            this.startElectron();
            
            clearTimeout(this.timer)
            this.timer = setTimeout(()=>{
                this.isRelaunch = false;
            },5000)
        }
    },
    // 编译主进程
    startMain(){
        const argv = this.argv;
        argv.devServer = {};
        ["host","port"].forEach(key=>{
            argv.devServer[key] = this.devServerConfig[key]
        })
        argv.devServer.protocol = this.devServerConfig["https"]?"https":"http";

        const fnWebpackConfig = require('./webpack.main.config.js');

        let config = fnWebpackConfig(argv.env,argv);
        const compiler = webpack(config);
        compiler.hooks.watchRun.tapAsync('watch-run', (compilation, done) => {
            // 设置Babel环境变量
            process.env.BABEL_ENV = "main";
            done()
        })
        return new Promise((resolve, reject)=>{
            compiler.watch({},(err,stats)=>{
                if(err){
                    console.log(chalk.red(err.stack || err));
                    reject(err)
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

                console.log(`${chalk.green(`\ntime：${(stats.endTime - stats.startTime) / 1000} s`)}\n${chalk.white('main 进程编译完毕')}\n`);

                this.relaunchElectron();
                
                resolve(true);
            })
        })
    },
    // 编译渲染进程
    async startRenderer(){
        const argv = this.argv;
        const fnWebpackConfig = require('./webpack.renderer.config.js');

        let config = fnWebpackConfig(argv.env,argv);
        let devServerConfig = config.devServer;
        
        devServerConfig.port = await getPort(devServerConfig.port||8080);
        devServerConfig.host = devServerConfig.host || "localhost";
        

        this.devServerConfig = devServerConfig;        
        const compiler = webpack(config);
        compiler.hooks.watchRun.tapAsync('watch-run', (compilation, done) => {
            // 设置Babel环境变量
            process.env.BABEL_ENV = "renderer";
            done()
        })

        WebpackDevServer.addDevServerEntrypoints(config, devServerConfig);
        const port = devServerConfig.port;
        const server = new WebpackDevServer(compiler, devServerConfig);
        server.listen(port);

        return new Promise((resolve, reject) =>{
            compiler.hooks.done.tap('done', stats => {
                const compilation = stats.compilation;
                compilation.warnings.forEach(key => {
                    console.log(chalk.yellow(key));
                });
                compilation.errors.forEach(key => {
                    console.log(chalk.red(`${key}:${stats.compilation.errors[key]}`));
                });

                console.log(`${chalk.green(`\ntime：${(stats.endTime - stats.startTime) / 1000} s`)}\n${chalk.white('renderer 进程编译完毕')}\n`);

                resolve(true);
            })
        });
    },
    // 启动调试
    async runDev(){
        try{
            await this.startRenderer();
            await this.startMain();
            this.startElectron();
        }catch(err){
            console.log(chalk.red(err.toString()));
            process.exit();
        }
    },
    run(){
        let argv = parseArgs(process.argv);
        this.argv = {...this.argv,...argv};
        console.log(this.argv);
        // 启动调试
        this.runDev();
    },
};

dev.run();