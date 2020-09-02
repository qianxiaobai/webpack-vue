<template>
  <div>
    <img style="width:100px;height:200px" src="../assets/img/logo77.png" alt="">
    asdsa
    <span class="iconfont">&#xe6ec;</span>
    <router-view></router-view>
  </div>
</template>

<script>
import {get,post} from "@/utils/axios"
import {login,getTree} from "@/utils/http"
export default {
  name:'APP',
  components:{
     //common
   },
  data() {
    return { };
  },
   created(){
    this.loginHandler()
    this.getTreedata()
   },
  mounted(){
   },
  methods: {
    async loginHandler(){
      let loginData = login({userName:"admin",password:"111111"})
      // login({userName:"admin",password:"111111"}).then(res=>{
      //   console.log(res,"vvvsdsdsdds")
      // })
      console.log(loginData,"loginData")
    },
    async getTreedata(){
      let tree = await getTree()
      // console.log(tree,"ffffffffffffffffff")
    },
    // getTreedata(){
    //   getTree().then(res=>{
    //     console.log(res)
    //   })
    // }
   }
};
</script>

<style lang='stylus'>
  
</style>
