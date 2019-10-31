let EthereumTx = require('ethereumjs-tx')

class Account{
  /**
   * 对数据签名
   * @param {object} data 要签名的数据
   * @param {buffer} pk 私钥 0x...
   * @return {string} 签名字符串
   */
  getSign(data,pk){
    let privateKey = Buffer.from(
      pk.slice(2),
      'hex',
    )
    let tx = new EthereumTx(data)
    tx.sign(privateKey)
    let serializedTx = '0x'+tx.serialize().toString('hex')
    return serializedTx
  }
}

module.exports = Account