import axios from "axios"

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
        console.log(res)
        // if()
        return res.data
    },
    err=>{
        console.log(err)
    }
)


// get
export function get(url,data){
    return axios.get(url,{params:data})
}
// post
export function post(url,data){
    return axios({
        url:url,
        method:"post",
        data
    })
}





export default axios