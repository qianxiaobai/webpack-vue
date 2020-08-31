const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack');
const VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports={
    entry:"./src/main.js",
    output:{
        path:path.resolve(__dirname,"dist"),
        filename:"bundle.js"
    },
    plugins: [
        // new VueLoaderPlugin(),
        new CleanWebpackPlugin(), //每次在打包时，文件都是已覆盖已有的，不删除多余的。执行npm run build后dist目录先被删除然后在重新根据配置生成。
        new HtmlWebpackPlugin({      //自动生成一个引入了打包后JS的html
            template: path.resolve(__dirname, './public/index.html'),//模板文件
            filename: 'index.html'//生成的文件名称
        }),
        //如果不想让css放在header中style标签中，我们可以使用插件来帮我们抽离css并打包输出到dist目录,此时需要去掉'style-loader'
        new MiniCssExtractPlugin({
            filename: '[name].css',        //输出文件名 
            chunkFilename: '[id].css',    //模块名
        }),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery'
        }),
        new VueLoaderPlugin()
    ], 
    module:{
        rules:[
            {
                // es6转es5
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                        plugins: [
                            '@babel/plugin-transform-runtime',
                            '@babel/plugin-transform-modules-commonjs'
                        ]
                    }
                }
            },
            /**
             * 处理css模块需要两个loader：style-loader和css-loader
             * css-loader工作机制：处理css模块，识别合并css模块
             * style-loader工作机制：把合并的css模块放到html中head的style标签中。
             */
            {
                test: /\.css$/,
                use: [
                    //执行顺序：从下到上，从右到左
                    MiniCssExtractPlugin.loader, //抽离css替换掉style-load
                    // 'style-loader', //把合并的css放到style标签
                    'css-loader' //先识别css并合并为一个css
                ]
            },
            /**
             * 处理stylus文件需要style-loader、css-loader、stylus-loader，
             * stylus-loaderr工作机制:把stylus语法转换成css，
            */
            {
                test: /\.styl$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'stylus-loader'
                ]
            },
            {
              test: /\.(png|svg|jpg|gif|webp)$/,
              use: [
                  {
                      loader: 'url-loader',
                      options: {
                        name:"[name]-[hash].[ext]",//[]表示占位符,name表示源文件的名字，ext是源文件的后缀,hash是复制的文件名入‘570e69d9e57c7d0203b5e30a9dd1dbdf’
                        // outputPath:"images/",    //配置输出位置
                          // 图片输出的实际路径(相对于dist)
                          outputPath: 'images/',
                          // 当小于某KB时转为base64
                          limit: 2048,
                          esModule: false //作用是启用CommonJS模块语法
                      }
                  }
              ]
           },
        //    解析vue
           {
            test: /\.vue$/,
            loader: 'vue-loader'
          },
            // 处理字体
            {
            test: /\.(woff2?|eot|ttf|otf|svg|icon)(\?.*)?$/,
            loader: 'url-loader',
            options: {
                name:"[name]-[hash:7].[ext]",//[]表示占位符,name表示源文件的名字，ext是源文件的后缀,hash是复制的文件名入‘570e69d9e57c7d0203b5e30a9dd1dbdf’
                outputPath:"fonts/",    //配置输出位置
                limit: 10000,                  
            }
        },
        ]
    },
    //别名配置
    resolve: {
        alias: {
            'vue': 'vue/dist/vue.js',
            '@': path.resolve(__dirname,'src')
        }
    },
 
}