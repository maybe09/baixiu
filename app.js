const express=require('express');
const ejs=require('ejs');
const useRouter=require('./router/usersrouter.js');//用户
const categoryRouter=require('./router/categoryRouter.js');//分类
const loginRouter=require('./router/loginRouter.js');//登录
const articleRouter=require('./router/articleRouter.js')//文章
const setRouter=require('./router/setRouter.js')//设置
const boardRouter=require('./router/dashboardRouter')//仪表盘
const commentRouter=require('./router/commentRouter.js')
const bodyParser=require('body-parser');

//引入cookieSession
const cookieSession=require('cookie-session');
const app=express();
// 配置 ejs 模板引擎
app.set('views', './views') // 设置模板引擎的静态页面
app.set('view engine', 'ejs') // 设置渲染模板使用的引擎
// 统一处理静态资源
// 配置静态文件
app.use('/assets', express.static('./assets'))
app.use('/static/uploads', express.static('./uploads'))
app.use(express.static('./public'))

// 配置 body-parser
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// 配置cookieSession
app.use(cookieSession({
    name: 'session',
    keys: ['key1', 'key2']
  }))
  
// 处理登录的路由
app.use(loginRouter);
//处理用户的外置路由
app.use(useRouter);
// 处理分类的外置路由
app.use(categoryRouter);
// 处理文章的路由
app.use(articleRouter);
// 设置导航菜单栏
app.use(setRouter);
// 仪表盘外置路由
app.use(boardRouter);
// 设置评论的外置路由
app.use(commentRouter);
app.listen(3000,()=>{
    console.log('running');
})