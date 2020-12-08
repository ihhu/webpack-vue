<template>
    <div id="app">
        <router-link to="/" exact>根路由</router-link>
        <router-link to="/a">a路由</router-link>
        <router-link to="/b">b路由</router-link>
        <hr>
        <hr>
        <hr>
        <router-view />
        <hr><hr><hr>
        {{book.title}}
        <h1>
            {{text}}
        </h1>
        <div class="img">
            <img src="./Style/Images/11.jpg" alt="">
        </div>
        <div class="bg-img">
            img background
        </div>
    </div>
</template>
<script lang="ts">
    import { defineComponent, reactive } from "vue";
    interface Book {
        title: string
        year?: number
    }
    export default defineComponent({
        data(){
            const text=314342432423
            return {
                text
            }
        },
        setup() {
            const book = reactive<Book>({ title: 'Vue 3 Guide' })
            return { book }
        },
        methods:{
            test(){
                let a=data=>console.log(data);
                return a
            }
        },
        mounted(){
            console.log(this.text);
            let a = new Promise(function(resolve, reject) {
                resolve();
            });

            a.then(()=>{
                console.log("Promise aa")
            });
            const b =new Map()
            b.set(a,"Promise");
            console.log("map",b.get(a));
            console.log([1, 4, -5, 10].find((n) => n < 0));
        }
    })
</script>
<style lang="scss">
    h1{font-size:50px;color:red;display:flex;transform:translate(50%)}
    
    .img{width:600px;margin-bottom: 10px;;
        img{display: block;width:100%;}
    }
    .bg-img{width:500px;min-height:275px;background:url(~@Style/Images/a/12.jpg) no-repeat left top;background-size:500px auto;}
</style>