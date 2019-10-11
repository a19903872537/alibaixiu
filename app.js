// 引入express框架
const express = require('express');
// 引入数据库处理模块
const mongoose = require('mongoose');
// 引入路径处理模块
const path = require('path');
// 引入session模块
var session = require('express-session');
var saslprep = require("saslprep");
// 处理文件上传
const formidableMiddleware = require('express-formidable');
// web服务器
const app = express();
const host = 'localhost';
const port = 3000;
// 开放静态资源
app.use(express.static(path.join(__dirname, 'public')));
// session配置
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false
}));
// 处理post参数
app.use(formidableMiddleware({
    // 文件上传目录
    uploadDir: path.join(__dirname, 'public', 'uploads'),
    // 最大上传文件为2M
    maxFileSize: 2 * 1024 * 1024,
    // 保留文件扩展名
    keepExtensions: true
}));

// 数据库连接
mongoose.connect('mongodb://itcast:itcast@localhost:27017/alibaixiu', { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true })
    .then(() => console.log('数据库连接成功'))
    .catch(() => console.log('数据库连接失败'));

// 路由
require('./routes')(app);
// 返回系统监听
app.listen(port, host, err => {
    if (!err) {
        console.log('服务器已启动');
        console.log('http://' + host + ':' + port);
        return;
    }
    console.log('服务器启动失败');
    console.log(err);
})