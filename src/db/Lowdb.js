let low = require('lowdb')
let FileSync = require('lowdb/adapters/FileSync')

class Lowdb{
  /**
   * @param {string} file 文件路径
   */
  constructor(file){
    // 申明一个适配器
    let adapter = new FileSync(file)
    let db = low(adapter)
    this.db = db
  }
  /**
   * 写入数据
   * @param {*} key 
   * @param {*} val 
   */
  set(key,val){
    this.db.set(key,val).write()
  }
  /**
   * 读取数据
   * @param {*} key 
   */
  get(key){
    if(key === undefined){
      return this.db.value()
    }
    return this.db.get(key).value()
  }
  /**
   * 给数组添加数据
   * @param {*} key 
   * @param {*} val 
   */
  push(key,val){
    this.db.get(key)
      .push(val)
      .write()
  }
  /**
   * 查询
   * @param {string} key 
   * @param {object} where 
   */
  find(key,where){
    return this.db.get(key).find(where).value()
  }
}
module.exports = Lowdb