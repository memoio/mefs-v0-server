let Koa = require('koa')
let koa = new Koa()

let config = {
  prot:app.config.apiProt
}
/**
 * 添加路由
 */
function addRoute(){
	koa.use(require('./controller')())
}
/**
 * 配置
 */
function init(){
	// 在服务端显示各种请求操作记录
	koa.use(require('koa-logger')())
	// 用于发送json
	koa.use(require('./middleware/json-send')())
	// 处理post请求
	koa.use(require('koa-bodyparser')())
}
function start(){
	init()
	addRoute()
  let server = koa.listen(config.prot, function(){
		let host = server.address().address
		let port = server.address().port
		console.log("访问地址: http://%s:%s", host, port)
	})
}
start()