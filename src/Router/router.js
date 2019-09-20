import Vue from "vue";
import Router from "vue-router";

import common from "@Components/common.vue";
const a = ()=>import(/* webpackChunkName:"views" */"@Views/a.vue");
const b = ()=>import(/* webpackChunkName:"views" */"@Views/b.vue");

Vue.use(Router);

const router = new Router({
    routes:[
        {
            path:"/",
            component:common,
        },
        {
            path:"/a",
            component:a,
        },
        {
            path:"/b",
            component:b,
        }
    ]
})

export default router;