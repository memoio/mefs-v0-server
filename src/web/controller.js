/*
  添加指定目录中所有的路由
*/

let fs = require('fs')
let router = require('koa-router')()

let config = {
  // 要扫描的文件目录
  filePath:__dirname+'/controllers/'
}

function addMapping(router, mapping){
  for (let url in mapping){
    if(url.startsWith('GET ')){
      let path = url.substring(4)
      router.get(path, mapping[url])
    }else if(url.startsWith('POST ')){
      let path = url.substring(5)
      router.post(path, mapping[url])
    }else{
      console.log(`错误的URL: ${url}`)
    }
  }
}
function addControllers(router){
  let files = fs.readdirSync(config.filePath)
  let js_files = files.filter((f) => {
    return f.endsWith('.js')
  })
  for(let f of js_files){
    let mapping = require(config.filePath + f)
    addMapping(router, mapping)
  }
}

module.exports = function(){
  addControllers(router)
  return router.routes()
}