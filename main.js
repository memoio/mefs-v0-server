let log = console.log,
dir = console.dir

let Object = require('./src/lib/Object')
let obj = new Object()

obj.copyAttr(global,{log,dir,obj})

let root = __dirname+'/'
let config = {
  root:root,
  // 数据库目录
  // dbHome:'../db/',
  // 以太坊地址
  ethUrl:'http://localhost:8101',
  mongodbUrl:'mongodb://127.0.0.1:27017/',
  dbName:'test',
  // api端口
	apiProt: 5566,
	// 日志根目录
  logPath:root+'logs/',
  // 有钱的主要的账号
  mpk:'0x928969b4eb7fbca964a41024412702af827cbc950dbe9268eae9f5df668c85b4',
  // 智能合约
  contracts:{
    key:{
      offer:'offer',
      query:'query',
    },
    indexer:{
      address:'0x9e4af0964ef92095ca3d2ae0c05b472837d8bd37',
      abi:[{"anonymous":false,"inputs":[{"indexed":false,"name":"key","type":"string"},{"indexed":false,"name":"owner","type":"address"},{"indexed":false,"name":"resolver","type":"address"}],"name":"Add","type":"event","signature":"0xec689a3871c35587e4800f14216f987ee744b924aff21741edc2e167e2dd43e8"},{"anonymous":false,"inputs":[{"indexed":false,"name":"key","type":"string"},{"indexed":false,"name":"form","type":"address"},{"indexed":false,"name":"to","type":"address"}],"name":"AlterResolver","type":"event","signature":"0x0a7047ba8be4d874e67aebc953a70ff6db03a81782549290ac646e0738ddfc04"},{"anonymous":false,"inputs":[{"indexed":false,"name":"key","type":"string"},{"indexed":false,"name":"form","type":"address"},{"indexed":false,"name":"to","type":"address"}],"name":"AlterOwner","type":"event","signature":"0x46bd035a76a8302bb74520f9226b59925d8186784298f88ad636a4ea46b85b21"},{"anonymous":false,"inputs":[{"indexed":false,"name":"data","type":"string"}],"name":"Error","type":"event","signature":"0x08c379a0afcc32b1a39302f7cb8073359698411ab5fd6e3edb2c02c0b5fba8aa"},{"constant":false,"inputs":[{"name":"key","type":"string"},{"name":"resolver","type":"address"}],"name":"add","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function","signature":"0x2bffc7ed"},{"constant":true,"inputs":[{"name":"key","type":"string"}],"name":"get","outputs":[{"name":"","type":"address"},{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function","signature":"0x693ec85e"},{"constant":false,"inputs":[{"name":"key","type":"string"},{"name":"resolver","type":"address"}],"name":"alterResolver","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function","signature":"0xcbdc3fe1"},{"constant":false,"inputs":[{"name":"key","type":"string"},{"name":"owner","type":"address"}],"name":"alterOwner","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function","signature":"0xf60b53e2"}],
    },
    offerResolver:{
      address:'',
      abi:[{"anonymous":false,"inputs":[{"indexed":false,"name":"owner","type":"address"},{"indexed":false,"name":"mapper","type":"address"}],"name":"Add","type":"event","signature":"0x473b736fe95295e8fbc851ca8acdc12a750976edad27a92f666b3d888eb895d3"},{"anonymous":false,"inputs":[{"indexed":false,"name":"owner","type":"address"},{"indexed":false,"name":"from","type":"address"},{"indexed":false,"name":"to","type":"address"}],"name":"AlterMapper","type":"event","signature":"0xa74fe41d06f59ab4da1dec9b736b2e9cc0b6f36b502d0c5276c5e52b2f2f8dd2"},{"anonymous":false,"inputs":[{"indexed":false,"name":"data","type":"string"}],"name":"Error","type":"event","signature":"0x08c379a0afcc32b1a39302f7cb8073359698411ab5fd6e3edb2c02c0b5fba8aa"},{"constant":false,"inputs":[{"name":"mapper","type":"address"}],"name":"add","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function","signature":"0x0a3b0a4f"},{"constant":true,"inputs":[{"name":"owner","type":"address"}],"name":"get","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function","signature":"0xc2bc2efc"},{"constant":false,"inputs":[{"name":"mapper","type":"address"}],"name":"alterMapper","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function","signature":"0xac5c505e"}],
    },
    queryResolver:{
      address:'',
      abi:[{"anonymous":false,"inputs":[{"indexed":false,"name":"owner","type":"address"},{"indexed":false,"name":"mapper","type":"address"}],"name":"Add","type":"event","signature":"0x473b736fe95295e8fbc851ca8acdc12a750976edad27a92f666b3d888eb895d3"},{"anonymous":false,"inputs":[{"indexed":false,"name":"owner","type":"address"},{"indexed":false,"name":"from","type":"address"},{"indexed":false,"name":"to","type":"address"}],"name":"AlterMapper","type":"event","signature":"0xa74fe41d06f59ab4da1dec9b736b2e9cc0b6f36b502d0c5276c5e52b2f2f8dd2"},{"anonymous":false,"inputs":[{"indexed":false,"name":"data","type":"string"}],"name":"Error","type":"event","signature":"0x08c379a0afcc32b1a39302f7cb8073359698411ab5fd6e3edb2c02c0b5fba8aa"},{"constant":false,"inputs":[{"name":"mapper","type":"address"}],"name":"add","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function","signature":"0x0a3b0a4f"},{"constant":true,"inputs":[{"name":"owner","type":"address"}],"name":"get","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function","signature":"0xc2bc2efc"},{"constant":false,"inputs":[{"name":"mapper","type":"address"}],"name":"alterMapper","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function","signature":"0xac5c505e"}],
    },
    mapper:{
      abi:[{"constant":false,"inputs":[{"name":"newOwner","type":"address"}],"name":"alterOwner","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function","signature":"0x0ca05f9f"},{"constant":true,"inputs":[],"name":"getOwner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function","signature":"0x893d20e8"},{"anonymous":false,"inputs":[{"indexed":false,"name":"addr","type":"address"}],"name":"Add","type":"event","signature":"0x87dc5eecd6d6bdeae407c426da6bfba5b7190befc554ed5d4d62dd5cf939fbae"},{"anonymous":false,"inputs":[{"indexed":false,"name":"from","type":"address"},{"indexed":false,"name":"to","type":"address"}],"name":"AlterOwner","type":"event","signature":"0x8c153ecee6895f15da72e646b4029e0ef7cbf971986d8d9cfe48c5563d368e90"},{"anonymous":false,"inputs":[{"indexed":false,"name":"data","type":"string"}],"name":"Error","type":"event","signature":"0x08c379a0afcc32b1a39302f7cb8073359698411ab5fd6e3edb2c02c0b5fba8aa"},{"constant":false,"inputs":[{"name":"addr","type":"address"}],"name":"add","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function","signature":"0x0a3b0a4f"},{"constant":true,"inputs":[],"name":"get","outputs":[{"name":"","type":"address[]"}],"payable":false,"stateMutability":"view","type":"function","signature":"0x6d4ce63c"}],
    },
    offer:{
      abi:[{"inputs":[{"name":"capacity","type":"uint256"},{"name":"duration","type":"uint256"},{"name":"price","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"constructor","signature":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"name":"data","type":"string"}],"name":"Error","type":"event","signature":"0x08c379a0afcc32b1a39302f7cb8073359698411ab5fd6e3edb2c02c0b5fba8aa"},{"anonymous":false,"inputs":[{"indexed":true,"name":"data","type":"uint256"}],"name":"LogInt","type":"event","signature":"0xc8fa9a7021af252bc69defe2b981f7bd7858defe2a87641768fefdb8a03a07cd"},{"constant":true,"inputs":[],"name":"get","outputs":[{"name":"","type":"uint256"},{"name":"","type":"uint256"},{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function","signature":"0x6d4ce63c"}],
    },
    query:{
      abi:[{"inputs":[{"name":"capacity","type":"uint256"},{"name":"duration","type":"uint256"},{"name":"price","type":"uint256"},{"name":"ks","type":"uint256"},{"name":"ps","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"name":"data","type":"string"}],"name":"Error","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"data","type":"uint256"}],"name":"LogInt","type":"event"},{"constant":true,"inputs":[],"name":"get","outputs":[{"name":"","type":"uint256"},{"name":"","type":"uint256"},{"name":"","type":"uint256"},{"name":"","type":"uint256"},{"name":"","type":"uint256"},{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"setCompleted","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"}],
    },
  }
}

let Mongodb = require('./src/db/mongodb/mongodb')
let Table = require('./src/db/mongodb/table')
let db = new Mongodb(config.mongodbUrl,config.dbName)
let block = new Table(db,'block')
let tx = new Table(db,'tx')
let order = new Table(db,'order')

let axios = require('axios')
let Web3 = require('web3')

let eth = require('./src/eth/eth')
// let Lowdb = require('./src/db/Lowdb')
let ResultModel = require('./src/web/ResultModel')

// let blockDb = new Lowdb(config.dbHome+'block.json')
// let blockMapDb = new Lowdb(config.dbHome+'block-map.json')
// let txDb = new Lowdb(config.dbHome+'tx.json')
// let addressDb = new Lowdb(config.dbHome+'address.json')
// let infoDb = new Lowdb(config.dbHome+'info.json')
// let txMapDb = new Lowdb(config.dbHome+'tx-map.json')
// let txReceiptDb = new Lowdb(config.dbHome+'tx-receipt.json')
let web3 = new Web3(Web3.givenProvider || config.ethUrl)

let rm = new ResultModel({
  ok:{
    code:200,
    msg:'成功'
  },
  error:{
    code:444,
    msg:'失败'
  }
})

global.app = {
  config:config,
  // db:{
  //   block:blockDb,
  //   blockMap:blockMapDb,
  //   tx:txDb,
  //   address:addressDb,
  //   info:infoDb,
  //   txMap:txMapDb,
  //   txReceiptDb:txReceiptDb,
  // },
  mdb:{
    block,tx,order,
  },
  eth,web3,
  axios,rm
}

async function ct(){
  let res
  // 获取Indexer合约对象
  let indexer = web3.eth.Contract(config.contracts.indexer.abi,config.contracts.indexer.address)
  // 获取最新的相应的合约地址
  res = await indexer.methods.get('offer').call()
  config.contracts.offerResolver.address = res[1]
  res = await indexer.methods.get('query').call()
  config.contracts.queryResolver.address = res[1]
  // 获取resolver合约对象
  let offerResolver = web3.eth.Contract(config.contracts.offerResolver.abi,config.contracts.offerResolver.address)
  let queryResolver = web3.eth.Contract(config.contracts.queryResolver.abi,config.contracts.queryResolver.address)

  obj.copyAttr(global.app,{
    offerResolver,queryResolver,
  })
  // require('./src/query')
}
ct()

require('./src/web/index')

// require('./src/query-mongodb_test')