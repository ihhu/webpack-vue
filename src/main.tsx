import "@Style/Scss/Style.scss";

import { createApp, h } from "vue";
import router from "@Router/router.ts";

import App from "./App.vue";

console.log("IS_DEV:::",IS_DEV)
console.log("app",App);

const app = createApp({
    data(){
        return {
            text:424323
        }
    },
    render(){
        return <App/>
    },
    // router,
    mounted(){
        var oApp=document.querySelector("#app") as Element;
        var oImg=require("@Style/Images/13.jpg");
        console.log("oImg::",oImg)
        var oImgEle=document.createElement("img");
        oImgEle.src=oImg;
        oImgEle.style.width="500px";
        oImgEle.style.backgroundImage=`url(${oImg})`;
        oApp.appendChild(oImgEle);
    }
    
})

app.use(router)
app.mount("#app");

let a = new Promise(function(resolve, reject) {
    resolve(void 0);
});
const b =new Map()
b.set(a,"Promise");


async function cc(){
    await a.then(data=>{
        console.log("Promise aa")
    });
    console.log("await ccccc");
};
cc();

class D{
    a:number;
    b="bb";

    constructor(){
        this.a=0;
    }
    setA(){
        this.a=10;
    }
}
const d=new D()
console.log("class dd",d,d.b,d.a)
d.setA();
console.log("class d.a",d.a)
console.log("map",b.get(a));
console.log([1, 4, -5, 10].find((n) => n < 0));


// 启用热更新
if((module as any).hot){
    (module as any).hot.accept()
}