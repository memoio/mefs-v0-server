class Query{
  // 获取最后的n个块
  // @param {int} n
  // @return {array} 
  lastBlock(n){}
  // 获取最后的n个交易
  // @param {int} n 
  // @return {array} 
  lastTx(n){}
  info(){}
  // 获取块列表
  // @param {int} row 一页几条记录
  // @param {int} n 第n页
  blockList(row,n){}
  // id 块number 或 hash
  getBlock(id){}
  // 获取交易列表
  // @param {int} row 一页几条记录
  // @param {int} n 第n页
  txList(row,n){}
  getTx(id){}
  addrList(addr,row,n){}
  // 获取订单信息
  // @param {string} key 角色
  // @param {string} addr 地址
  getOrderList(key,addr){}
}

let db = app.mdb
class QueryMongodb extends Query{
  // 获取分页的开始与结束位置
  // @param {int} count 总条数
  // @param {int} row 一页多少条
  // @param {int} n 第n页
  // @param {bool} reverse true倒序
  getPage(count,row,n,reverse=false){
    row = parseInt(row)
    let sum = count/row
    if(sum > parseInt(sum)){
      sum = parseInt(sum) + 1
    }else{
      sum = parseInt(sum)
    }
    // 获取最后一页
    if(n == 'last'){
      n = sum
    }else{
      n = parseInt(n)
    }
    let res = {
      sum:sum,//总页数
      n:n,//当前页
      row:row,//一页有几条记录
      data:[], //数据
    }
    let start,end
    if(reverse){
      end = count - (n-1) * row
      start = end - row
      start = start<1?0:start
    }else{
      start = (n-1)*row
      start = start>0?start:0
      end = n*row
      end = end>count?count:end
    }
    return {res,start,end}
  }
  async lastBlock(n){
    let res = []
    let sum = await db.block.count()
    let flag = sum-n>0?sum-n:1
    res = await db.block.select({id:{$gte:flag}},{sort:[['id',1]],projection:{'_id':0,'id':0}})
    return res
  }
  async lastTx(n){
    let res = []
    res = await db.tx.select({},{sort:[['id','descending']],projection:{'_id':0,'id':0},limit:n})
    return res
  }
  async getBlock(id){
    let block
    // 判断是id,还是hash
    if(id.charAt(1) == 'x'){
      block = await db.block.select({hash:id},{projection:{'_id':0,'id':0}})
    }else{
      id = parseInt(id)
      block = await db.block.select({id:id},{projection:{'_id':0,'id':0}})
    }
    return block[0]
  }
  async getTx(id){
    let tx = await db.tx.select({hash:id},{projection:{'_id':0,'id':0}})
    return tx[0]
  }
  async blockList(row,n){
    let sum = await db.block.count()
    let {res,start,end} = this.getPage(sum,row,n,true)
    res.data = await db.block.select({id:{$gte:start,$lt:end}},{projection:{'_id':0,'id':0},sort:[['id','descending']]})
    return res
  }
  async txList(row,n){
    let sum = await db.tx.count()
    let {res,start,end} = this.getPage(sum,row,n)
    res.data = await db.tx.select({},{projection:{'_id':0,'id':0},sort:[['id','descending']],skip:start,limit:end-start})
    return res
  }
  async addrList(addr,row,n){
    let where = {$or:[{from:addr}, {to:addr}]}
    let sum = await db.tx.count(where)
    let {res,start,end} = this.getPage(sum,row,n)
    res.data = await db.tx.select(where,{projection:{'_id':0,'id':0},sort:[['id','descending']],skip:start,limit:end-start})
    return res
  }
  async getOrderList(key,addr){
    let res,where
    where = key?{[key]:{$regex:`^${addr}\$`,$options:'i'}}:{}
    res = await db.order.select(where,{projection:{'_id':0},sort:[['timestamp','descending']]})
    return res
  }
  async info(){
    let res = {
      blockNumber:'',
      difficulty:'',
      gasLimit:[],
      gasPrice:[],
    }
    let sum = await db.block.count()
    let block = await db.block.select({id:{$lte:sum-1,$gt:sum-1-20}},{projection:{_id:0,id:1,difficulty:1,gasLimit:1},sort:[['id','ascending']]})
    res.blockNumber = block[block.length-1].id
    res.difficulty = block[block.length-1].difficulty
    for(let v of block){
      res.gasLimit.push(v.gasLimit)
    }
    let tx = await db.tx.select({},{projection:{_id:0,gasPrice:1},sort:[['id','descending']],limit:20})
    for(let v of tx){
      res.gasPrice.push(v.gasPrice)
    }
    return res
  }
}

module.exports = QueryMongodb