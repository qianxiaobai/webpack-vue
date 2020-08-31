// import Vue from "vue/dist/vue.js"
import Vue from "vue"
import APP from "./APP.vue"
import "./assets/reset.css"
import router from "./router"
import store from "./store"

new Vue({
    router,
    store,
    render: h => h(APP)
}).$mount("#app");