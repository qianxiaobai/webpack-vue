import axios from "axios"
import QS from "qs"
console.log(process.env.NODE_ENV,"process.env.NODE_ENV")

axios.defaults.baseURL = process.env.NODE_ENV=="development" ? 
"http://10.1.1.175:9001" : ""
// console.log(axios.defaults.baseURL,"vbaseURL")
axios.defaults.timeout = 10000; 
axios.defaults.withCredentials = true //携带cookie 
// 需要后端配置请求头
// header("Access-Control-Allow-Origin","源地址";
// header("Access-Control-Allow-Credentials", "true");

// 请求拦截器
axios.interceptors.request.use(
    config=>{
        // config.headers = Object.assign({}, config.headers, { token: sessionStorage.getItem("token") })
        return config
    },
    error=>{
        return Promise.reject(error)
    }
)

// 响应拦截器
axios.interceptors.response.use(
    res=>{
        // console.log(res)
        return res.data
    },
    err=>{
        console.log(err)
    }
)


// get
export function get(url,data={}){
    if(url.indexOf("?") != -1){ //防止ie浏览器缓存
        url = url + "&n=" + encodeURIComponent(Math.random())
    }else{
        url = url + "?n=" + encodeURIComponent(Math.random())
    }
    // return axios.get(url,{params:data})
    return new Promise((resolve, reject) =>{        
      axios.get(url, {            
          params: data       
      }).then(res => {
          return resolve(res.data);
      }).catch(err =>{
          return reject(err.data)
      })
    })
}

// post
export function post(url,data={}){
    return axios({
        url:url,
        method:"post",
        data
    })
}
// 表单
// By default, axios serializes JavaScript objects to JSON
export function postForm(url, data = {}) {
    if (typeof data != "object") {
      return
    }
    return axios({
      url: ip + url,
      method: "post",
      headers: { "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8" },
      transformRequest: [
        function(data) {
          let ret = ""
          for (let it in data) {
            ret += encodeURIComponent(it) + "=" + encodeURIComponent(data[it]) + "&"
          }
          return ret
        }
      ],
      data
    })
  }
//   put
export function put(url, data) {
    return axios({
      url: ip + url,
      method: "put",
      data
    })
  }



// delete
export function deletes(url, data) {
    return axios({
      url: ip + url,
      method: "delete",
      data
    })
  }





export default axios