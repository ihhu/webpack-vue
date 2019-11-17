const path=require("path");
const fs = require('fs');
const os = require('os');

const {PATHS} = require("./config");

const resolve = dir => path.join(__dirname, "..", dir);

// 获取html文件名，生成多页面入口
const getPagesEnter = path => {
    const dirArr = fs.readdirSync(path);
    const filesArr = dirArr.filter(e => e.indexOf('html') >= 0)
                           .map(e => e.replace('.html', ''));
    return filesArr;
};
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
const untils={
    resolve,
    getPagesEnter,
    getIPAdress
} 

module.exports=untils;