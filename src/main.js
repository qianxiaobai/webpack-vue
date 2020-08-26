// import Vue from "vue/dist/vue.js"
import Vue from "vue"
import APP from "./APP.vue"
import "./assets/reset.css"
import router from "./router"
// console.log(vue)


new Vue({
    router,
    render: h => h(APP)
}).$mount("#app");