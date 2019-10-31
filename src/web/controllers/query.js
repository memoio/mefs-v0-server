let rm = app.rm
let QueryMongodb = require(app.config.root+'src/query-mongodb')
let query = new QueryMongodb()
let queryByChain = require(app.config.root+'src/query')

module.exports = {
  /**
   * 信息
   */
  'GET /info': async (ctx)=>{
    ctx.send(rm.ok(await query.info()))
  },
  /**
   * 最后n个块
   */
  'GET /lastBlock/:n': async (ctx)=>{
    let n = parseInt(ctx.params.n)
    ctx.send(rm.ok(await query.lastBlock(n)))
  },
  /**
   * 最后n个交易
   */
  'GET /lastTx/:n': async (ctx)=>{
    let n = parseInt(ctx.params.n)
    ctx.send(rm.ok(await query.lastTx(n)))
  },
  // 块详情
  'GET /block/:id': async (ctx)=>{
    let id = ctx.params.id
    ctx.send(rm.ok(await query.getBlock(id)))
  },
  // 块列表
  'GET /block/:num/:n': async (ctx)=>{
    let num = ctx.params.num
    let n = ctx.params.n
    ctx.send(rm.ok(await query.blockList(num,n)))
  },
  // 交易详情
  'GET /tx/:id': async (ctx)=>{
    let id = ctx.params.id
    ctx.send(rm.ok(await query.getTx(id)))
  },
  // 交易列表
  'GET /tx/:num/:n': async (ctx)=>{
    let num = ctx.params.num
    let n = ctx.params.n
    ctx.send(rm.ok(await query.txList(num,n)))
  },
  // 地址相关交易列表
  'GET /addr/:addr/:num/:n': async (ctx)=>{
    let addr = ctx.params.addr
    let num = ctx.params.num
    let n = ctx.params.n
    ctx.send(rm.ok(await query.addrList(addr,num,n)))
  },
  /**
   * 获取订单信息
   */
  'GET /order/user/:addr': async (ctx)=>{
    let addr = ctx.params.addr
    let res = await query.getOrderList('user',addr)
    ctx.send(rm.ok(res))
  },
  'GET /order/keeper/:addr': async (ctx)=>{
    let addr = ctx.params.addr
    let res = await query.getOrderList('keeper',addr)
    ctx.send(rm.ok(res))
  },
  'GET /order/provider/:addr': async (ctx)=>{
    let addr = ctx.params.addr
    let res = await query.getOrderList('provider',addr)
    ctx.send(rm.ok(res))
  },
  'GET /order/offer/:addr': async (ctx)=>{
    let addr = ctx.params.addr
    let res = await queryByChain.storageMarket.offer(addr)
    ctx.send(rm.ok(res))
  },
  'GET /order/query/:addr': async (ctx)=>{
    let addr = ctx.params.addr
    let res = await queryByChain.storageMarket.query(addr)
    ctx.send(rm.ok(res))
  },
  // 申请资金
  'GET /applyMoney/:addr': async (ctx)=>{
    let addr = ctx.params.addr
    let res = await queryByChain.applyMoney(addr)
    ctx.send(rm.ok(res))
  },
}
/*
/transferHistory/0x439c734bd661f50af0ad8e8424d352215a37d5f9
/info
/lastBlock/6
/lastTx/6
/block/1
/block/0x...
/block/10/1
/block/10/last
/tx/0x...
/tx/10/1
/addr/0x.../10/1
/order/user/0x439c734Bd661f50Af0ad8E8424D352215a37D5F9
/order/keeper/0x40f1B2B83197D056F141aFc365c9806F1f4Bb021
/order/provider/0x73c0c3B225f54a0DeC9064182B30EC1dAbC09d88
/order/offer/0x0eb5b66c31b3c5a12aae81a9d629540b6433cac6
/order/query/0x0eb5b66c31b3c5a12aae81a9d629540b6433cac6

http://localhost:5566/info
http://localhost:5566/lastBlock/2
http://localhost:5566/block/2
http://localhost:5566/block/0xadc20cd126088ac8f8c284426d0b475e9353e36facf7974533ff96a211cd8fb6
http://localhost:5566/block/2/1
http://localhost:5566/block/2/last
http://localhost:5566/addr/0x0eb5b66c31b3c5a12aae81a9d629540b6433cac6/2/1
http://localhost:5566/order/user/0x439c734Bd661f50Af0ad8E8424D352215a37D5F9
*/