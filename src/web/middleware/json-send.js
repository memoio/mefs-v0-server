/*
发送json数据中间件
*/

module.exports = () => {
  function render(json){
    this.set("Content-Type", "application/json; charset=UTF-8")
    this.body = JSON.stringify(json)
  }
  return async (ctx, next) => {
    ctx.send = render.bind(ctx)
    await next()
  }
}