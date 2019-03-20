import Vue from "vue";
import App from "./App.vue";

import "./Style/Scss/Style.scss";

new Vue({
    data(){
        return {
            text:123
        }
    },
    el:"#app",
    components:{
        App
    },
    template:"<App/>",
    
})



let a = new Promise(function(resolve, reject) {
    resolve();
});

const b =new Map()
b.set(a,"Promise");


async function cc(){
    await a.then(()=>{
        console.log("Promise aa")
    });
    console.log("await cc");
};
cc();

class D{
    b="bb";

    constructor(){
        this.a=0;
    }
    setA(){
        this.a=10;
    }
}
const d=new D()
console.log("class d",d,d.b,d.a)
d.setA();
console.log("class d.a",d.a)
console.log("map",b.get(a));
console.log([1, 4, -5, 10].find((n) => n < 0));