import { createRouter, createWebHistory } from "vue-router";

import common from "@Components/common.vue";
// import a from "@Views/a.vue";
const a = ()=>import(/* webpackChunkName:"a" */"@Views/a.vue");
const b = ()=>import(/* webpackChunkName:"b" */"@Views/b.vue");
const tsx = ()=>import(/* webpackChunkName:"tsx" */"@Views/tsx.tsx");
// let c = 212;
// c = "fda";
const router = createRouter({
    history: createWebHistory(),
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
        },
        {
            path:"/tsx",
            component:tsx,
        }
    ]
})

export default router;