class Table{
  // @param {object} db 数据库对象
  // @param {string} name 表名
  constructor(db,name){
    this.db = db
    this.name = name
  }
  // 插入一条数据
  insertOne(data){
    this.db.tb(this.name,(tb)=>{
      tb.insertOne(data,(err,res)=>{
        if(err){
          log(err)
        }
      })
    })
  }
  // 查询
  // @param {object} where 查询条件
  // @param {object} field 字段设置
  select(where={},opt={}){
    return new Promise((resolve, reject)=>{
      this.db.tb(this.name,(tb)=>{
        tb.find(where,opt).toArray((err,res)=>{
          if(err){
            log(err)
          }
          resolve(res)
        })
      })
    })
  }
  // 查询一共有多少条记录
  // @return {int} 
  count(){
    return new Promise((resolve, reject)=>{
      this.db.tb(this.name,(tb)=>{
        tb.find().count((err,res)=>{
          if(err){
            log(err)
          }
          resolve(res)
        })
      })
    })
  }
  // 更新一条数据
  // @param {object} where 条件
  // @param {object} data 数据
  updateOne(where,data){
    this.db.tb(this.name,(tb)=>{
      tb.updateOne(where,{$set:data},{safe: true})
    })
  }
  // 删除一条数据
  // @param {object} where 条件
  deleteOne(where){
    this.db.tb(this.name,(tb)=>{
      tb.deleteOne(where)
    })
  }
}

module.exports = Table