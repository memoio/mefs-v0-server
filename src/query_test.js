async function t1(){
  let res = ''
  // res = query.transferHistory('0x439c734bd661f50af0ad8e8424d123123352215a37d5f9')
  // console.log(res)
  // res = query.ethDistribution()
  // res = query.lastBlock(2)
  // res = query.lastTx(3)
  res = await query.info()
  console.log(res)
}
// t1()