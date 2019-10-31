let QueryMongodb = require('./query-mongodb')
let q = new QueryMongodb()

async function test(){
  let res
  // res = await q.lastBlock(2)
  res = await q.lastTx(2)
  // res = await q.getBlock(2)
  // res = await q.getTx('0x6be240b440315a3582e854eb44d52fbd54b91f0ceab09285f1c1052c6d85a747')
  // res = await q.blockList(2,2)
  // res = await q.txList(2,2)
  // res = await q.addrList('0x0eb5b66c31b3c5a12aae81a9d629540b6433cac6',2,2)
  // res = await q.getOrderList()
  // res = await q.getOrderList('user','0x439c734Bd661f50Af0ad8E8424D352215a37D5F9')
  // res = await q.info()

  log(res)
}
test()