let Account = require('./eth/account')
let account = new Account()
let BigNumber = require('bignumber.js')

// 分页
// @param {bool} reverse true倒序
let paging = (data,row,n,reverse=false)=>{
  row = parseInt(row)
  let sum = data.length/row
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
  if(reverse){
    let start = data.length - 1 - (n-1) * row
    let end = start - row
    if(start < end || start > data.length){
      return res
    }
    if(end < 1){
      end = 0
    }
    for(let i = start; i > end; i--){
      res.data.push(data[i])
    }
  }else{
    let start = (n-1) * row
    let end = start + row
    if(start > data.length || n < 1){
      return res
    }
    if(end > data.length){
      end = data.length
    }
    for(let i = start; i < end; i++){
      res.data.push(data[i])
    }
  }
  return res
}

let query = {
  /**
   * 转账记录
   * @param {string} addr 要查询的地址
   * @return {array} 按时间排序
      [
        {
          to:'',
          value:'',
          tx:'',
          time:''
        },
        {
          from:'',
          value:'',
          tx:'',
          time:''
        }
      ]
   */
  transferHistory(addr){
    let res = []
    let data = app.db.tx.get()
    for(let k in data){
      if(data[k].from == addr){
        res.push({
          to:data[k].to,
          value:data[k].value,
          tx:data[k].hash,
          time:data[k].timestamp
        })
      }
      if(data[k].to == addr){
        res.push({
          from:data[k].from,
          value:data[k].value,
          tx:data[k].hash,
          time:data[k].timestamp
        })
      }
    }
    return res
  },
  addrList(addr,row,n){
    let res = []
    let data = app.db.tx.get()
    for(let k in data){
      if(data[k].from == addr || data[k].to == addr){
        res.push(data[k])
      }
    }
    return paging(res,row,n)
  },
  /**
   * 以太币分布情况
   * @return {object}
   */
  ethDistribution(){
    let res = {}
    let external = app.db.address.get('external')
    res = external
    return res
  },
  /**
   * 获取最后的n个块
   * @param {int} n
   */
  lastBlock(n){
    let data = app.db.block.get()
    let res = []
    for(let i=data.length-1; i>data.length-n-1; i--){
      res.push(data[i])
    }
    return res
  },
  /**
   * 获取最后的n个交易
   * @param {int} n 
   */
  lastTx(n){
    let res = []
    let len = app.db.block.get('length')
    for(let i=len-1; i>=0; i--){
      let data = app.db.txMap.get(i)
      if(!data) continue
      for(v of data){
        if(res.length == n) break
        res.push(app.db.tx.get(v))
      }
    }
    return res
  },
  // 获取所有交易 倒序
  getAllTx(){
    let res = []
    let len = app.db.block.get('length')
    for(let i=len-1; i>=0; i--){
      let data = app.db.txMap.get(i)
      if(!data) continue
      for(v of data){
        res.push(app.db.tx.get(v))
      }
    }
    return res
  },
  /**
   * @return {object}
      {
        "blockNumber": 0,
        "gasLimit": "",
        "gasPrice": "",
        "txpool": {}
      }
   */
  info(){
    let data = app.db.info.get()
    // 返回最新的20条
    let gasLimit = [],gasPrice = []
    let len = data.gasLimit.length
    let row = 20
    for(let i=len-row>=0?len-row:0; i<len; i++){
      gasLimit.push(data.gasLimit[i])
    }
    len = data.gasPrice.length
    for(let i=len-row>=0?len-row:0; i<len; i++){
      gasPrice.push(data.gasPrice[i])
    }
    return new Promise((resolve, reject)=>{
      resolve({
        blockNumber:data.blockNumber,
        difficulty:data.difficulty,
        gasLimit,gasPrice,
      })
    })
  },
  // 获取块列表
  // @param {int} row 一页几条记录
  // @param {int} n 第n页
  blockList(row,n){
    return paging(app.db.block.get(),row,n,true)
  },
  // id 块number 或 hash
  getBlock(id){
    if(id.length > 0 && id.charAt(1) == 'x'){
      return app.db.block.get(app.db.blockMap.get(id))
    }
    return app.db.block.get(id)
  },
  txList(row,n){
    return paging(this.getAllTx(),row,n)
  },
  getTx(id){
    return app.db.tx.get(id)
  },
  // 获取订单信息
  async getOrderList(){
    let txrList = app.db.txReceiptDb.get()
    let blockList = app.db.block.get()
    let data = []
    let AddOrderTag = app.web3.utils.sha3('AddOrder()')
    let abi = [{"constant":false,"inputs":[{"name":"newOwner","type":"address"}],"name":"alterOwner","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function","signature":"0x0ca05f9f"},{"constant":true,"inputs":[],"name":"getOwner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function","signature":"0x893d20e8"},{"inputs":[{"name":"user","type":"address"},{"name":"keeper","type":"address[]"},{"name":"provider","type":"address[]"},{"name":"time","type":"uint256"},{"name":"size","type":"uint256"}],"payable":true,"stateMutability":"payable","type":"constructor","signature":"constructor"},{"anonymous":false,"inputs":[],"name":"AddOrder","type":"event","signature":"0x0905316f7faca135c292b6e6f8d91c19128d372722215fe029e74e75ef84c087"},{"anonymous":false,"inputs":[{"indexed":false,"name":"user","type":"address"},{"indexed":false,"name":"provider","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"ReadPay","type":"event","signature":"0x412887bd474e56e243eb289e55bd2cc3fb5023d072e45e9541a3963107e3fe7c"},{"anonymous":false,"inputs":[{"indexed":false,"name":"from","type":"address"},{"indexed":false,"name":"to","type":"address"}],"name":"AlterOwner","type":"event","signature":"0x8c153ecee6895f15da72e646b4029e0ef7cbf971986d8d9cfe48c5563d368e90"},{"anonymous":false,"inputs":[{"indexed":false,"name":"data","type":"string"}],"name":"Error","type":"event","signature":"0x08c379a0afcc32b1a39302f7cb8073359698411ab5fd6e3edb2c02c0b5fba8aa"},{"constant":true,"inputs":[],"name":"getOrder","outputs":[{"name":"","type":"address"},{"name":"","type":"address[]"},{"name":"","type":"address[]"},{"name":"","type":"uint256"},{"name":"","type":"uint256"},{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function","signature":"0xd36dedd2"},{"constant":false,"inputs":[{"name":"time","type":"uint256"}],"name":"spaceTimePay","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function","signature":"0xb134fec8"},{"constant":false,"inputs":[{"name":"provider","type":"address"}],"name":"readPay","outputs":[{"name":"","type":"bool"}],"payable":true,"stateMutability":"payable","type":"function","signature":"0x2eb0346f"}]
    for(let txr in txrList){
      for(let log of txrList[txr].logs){
        if(log.topics[0] == AddOrderTag){
          let timestamp = blockList[parseInt(txrList[txr].blockNumber,16)].timestamp
          let uk = new app.web3.eth.Contract(abi,log.address)
          let res = await uk.methods.getOrder().call()
          data.push({
            timestamp:parseInt(timestamp,16),
            user:res[0],
            keeper:res[1],
            provider:res[2],
            time:res[3].toString(),
            size:res[4].toString(),
            totalPay:res[5].toString()
          })
        }
      }
    }
    return data
  },
  // 获取存储市场订单
  storageMarket:{
    // @param {string} addr 要查询人的地址
    async offer(addr){
      // {
      //   capacity:,
      //   duration:,
      //   price:,
      // }
      let res = []
      let mapper = await app.offerResolver.methods.get(addr).call()
      // 没有则返回
      if(!mapper || mapper == '0x0000000000000000000000000000000000000000'){
        return res
      }
      mapper = new app.web3.eth.Contract(app.config.contracts.mapper.abi,mapper)
      let list = await mapper.methods.get().call()
      let offer,data
      if(!list){
        return res
      }
      for(let v of list){
        offer = new app.web3.eth.Contract(app.config.contracts.offer.abi,v)
        data = await offer.methods.get().call()
        res.push({
          capacity:data[0].toString(),
          duration:data[1].toString(),
          price:data[2].toString(),
        })
      }
      return res
    },
    // @param {string} addr 要查询人的地址
    async query(addr){
      // {
      //   capacity:,
      //   duration:,
      //   price:,
      //   ks:,
      //   ps:,
      //   complete:,
      // }
      let res = []
      let mapper = await app.queryResolver.methods.get(addr).call()
      // 没有则返回
      if(!mapper || mapper == '0x0000000000000000000000000000000000000000'){
        return res
      }
      mapper = new app.web3.eth.Contract(app.config.contracts.mapper.abi,mapper)
      let list = await mapper.methods.get().call()
      let query,data
      if(!list){
        return res
      }
      for(let v of list){
        query = new app.web3.eth.Contract(app.config.contracts.query.abi,v)
        data = await query.methods.get().call()
        res.push({
          capacity:data[0].toString(),
          duration:data[1].toString(),
          price:data[2].toString(),
          ks:data[3].toString(),
          ps:data[4].toString(),
          complete:data[5].toString(),
        })
      }
      return res
    },
  },
  // 申请资金
  // 默认转1eth
  async applyMoney(to){
    let from = app.web3.eth.accounts.privateKeyToAccount(app.config.mpk).address
    let nonce = await app.eth.getTransactionCount(from)
    let num = new BigNumber('1.1e+22').toString(16)
    let param = {
      from:from,
      to:to,
      value: '0x'+num,
      nonce: nonce,
      gas : "0x100000",
      gasPrice: '0x1',
    }
    let sign = account.getSign(param,app.config.mpk)
    let tx = await app.eth.sendRawTransaction(sign)
    return tx
  },
}

async function t(){
  let addr = '0x0eb5b66c31b3c5a12aae81a9d629540b6433cac6',res
  // res = await query.storageMarket.offer(addr)
  res = await query.storageMarket.query(addr)
  log(res)
}
// t()

module.exports = query