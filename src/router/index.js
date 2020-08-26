import Vue from "vue"
import VueRouter from "vue-router"
import Home from "../views/home.vue"
Vue.use(VueRouter)

const routes=[
    {
        path:"/home",
        name:"home",
        component:Home,
        children:[
            {
                path:"/home/children",
                name:"children",
                component:()=>import("../views/children.vue")
            }
        ]
    },
    {
        path:"/children",
        name:"children",
        component:()=>import("../views/children.vue")
    }
]
const router = new VueRouter({
    mode:"hash",
    base: process.env.BASE_URL,
    routes
})

export default router