const {merge} = require('webpack-merge');
const base = require('./webpack.base');
module.exports = merge(base, {
    // 方便追踪源代码错误
    //（如果不需要该的追踪功能，可以注释掉下行代码）
    devtool: 'source-map'
});
