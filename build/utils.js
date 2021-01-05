const path=require("path");
const os = require('os');

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

const untils={
    getIPAdress,
    getPort,
    parseArgs
} 

module.exports=untils;

module.exports.logger = function(label =  "Electron", data = "", labelColor = "") {
    const LABEL_LENGTH = 28
    let log = "";
    data.toString().split(/\r?\n/).forEach(line => log += `\n${line}`);


    if (log == null || log.length === 0) {
      return
    }
  
    console.log(
        labelColor.bold(`┏ ${label} ${"-".repeat(LABEL_LENGTH - label.length - 1)}`) +
        "\n" + log + "\n" +
        labelColor.bold(`┗ ${"-".repeat(LABEL_LENGTH)}`) +
        "\n\n"
    )
}

