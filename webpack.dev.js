const {merge} = require("webpack-merge")
const base = require("./webpack.base")
module.exports = merge(base,{
    mode:"development",
    devServer:{
        contentBase:'./dist',    //服务器启动的目录
        // open:true,   
        proxy:{    //设置代理，可用于本地mock数据，本地自己启动另外一个服务
            // "/api":{
            //     target:"http://localhost:9000"
            // }
        },
        // port:9000, //指定端口号 默认8080
        // hotOnly:true
    },  
})