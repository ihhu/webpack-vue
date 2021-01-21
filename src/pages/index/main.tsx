import router from '@/router/index.ts';
import '@assets/scss/style.scss';
import { createApp } from 'vue';
import App from './App.vue';



console.log('IS_DEV:::',IS_DEV);
console.log('app',App);

const app = createApp({
  data(){
    return {
      text:424323
    };
  },
  // router,
  mounted(){
    const oApp=document.querySelector('#app') as Element;
    // eslint-disable-next-line
        const oImg=require('@assets/images/13.jpg');
    console.log('oImg::',oImg);
    const oImgEle=document.createElement('img');
    oImgEle.src=oImg;
    oImgEle.style.width='500px';
    oImgEle.style.backgroundImage=`url(${oImg})`;
    oApp.appendChild(oImgEle);
  },
  render(){
    return <App/>;
  }
    
});

app.use(router);
app.mount('#app');

const a = new Promise(function(resolve, reject) {
  resolve(void 0);
});
const b =new Map();
b.set(a,'Promise');


async function cc(){
  await a.then(data=>{
    console.log('Promise aa');
  });
  console.log('await ccccc');
}
cc();

class D{
    a:number;
    b='bb';

    constructor(){
      this.a=0;
    }
    setA(){
      this.a=10;
    }
}
const d=new D();
console.log('class dd',d,d.b,d.a);
d.setA();
console.log('class d.a',d.a);
console.log('map',b.get(a));
console.log([1, 4, -5, 10].find((n) => n < 0));


// 启用热更新
if((module as any).hot){
  (module as any).hot.accept();
}