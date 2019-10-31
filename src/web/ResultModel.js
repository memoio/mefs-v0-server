/**
 * 返回的模型 v1.0.0
 * 
 * {
 *   success:true|false,// 是否成功
 *   code:200,// 响应码
 *   msg:"",// 消息
 *   data:{}、[]、""、12// 响应数据
 * }
 */
class ResultModel{
	constructor(data = {}){
		if(data.ok){
			this.okConfig = {code:data.ok.code || 200,msg:data.ok.msg || ''}
		}else{
			this.okConfig = {code:200,msg:''}
		}
		if(data.error){
			this.errorConfig = {code:data.error.code || 444,msg:data.error.msg || ''}
		}else{
			this.errorConfig = {code:444,msg:''}
		}
	}
	/**
	 * 获取成功的响应对象
	 * @param {*} data 数据
	 * @param {number|string} arg1 设置响应码或消息
	 * @param {string} arg2 设置消息
	 */
	ok(data = '',arg1 = this.okConfig.msg ,arg2){
		let obj = {
			success:true,
			code:this.okConfig.code,
			msg:arg1,
			data:data
		}
		if(typeof(arg1) == 'number'){
			obj.code = arg1
			obj.msg = this.okConfig.msg
		}
		if(typeof(arg2) == 'string'){
			obj.msg = arg2
		}
		return obj
	}
	error(arg1 = this.errorConfig.msg ,arg2,arg3){
		let obj = {
			success:false,
			code:this.errorConfig.code,
			msg:arg1,
			data:''
		}
		if(typeof(arg1) == 'number'){
			obj.code = arg1
			obj.msg = this.errorConfig.msg
		}
		if(typeof(arg2) == 'string'){
			obj.msg = arg2
		}
		if(arg3){
			obj.data = arg3
		}
		return obj
	}
}

module.exports = ResultModel

/*
function test(){
	function t1(){
		log(new ResultModel().ok())
		log(new ResultModel().ok(''))
		log(new ResultModel().ok('数据hash','成功了'))
		log(new ResultModel().ok('数据hash',300))
		log(new ResultModel().ok('数据hash',300,'成功了'))
		log(new ResultModel().error())
		log(new ResultModel().error('错误信息'))
		log(new ResultModel().error(666))
		log(new ResultModel().error(666,'错误信息'))
		log(new ResultModel().error(666,'错误信息',{a:1}))
	}
	// { success: true, code: 200, msg: '', data: '' }
	// { success: true, code: 200, msg: '', data: '' }
	// { success: true, code: 200, msg: '成功了', data: '数据hash' }
	// { success: true, code: 300, msg: '', data: '数据hash' }
	// { success: true, code: 300, msg: '成功了', data: '数据hash' }
	// { success: false, code: 444, msg: '', data: '' }
	// { success: false, code: 444, msg: '错误信息', data: '' }
	// { success: false, code: 666, msg: '', data: '' }
	// { success: false, code: 666, msg: '错误信息', data: '' }
	// { success: false, code: 666, msg: '错误信息', data: { a: 1 } }
	// t1()
	
	function t2(rm){
		log(rm.ok())
		log(rm.ok(''))
		log(rm.ok('数据hash','成功了'))
		log(rm.ok('数据hash',300))
		log(rm.ok('数据hash',300,'成功了'))
		log(rm.error())
		log(rm.error('错误信息'))
		log(rm.error(666))
		log(rm.error(666,'错误信息'))
		log(rm.error(666,'错误信息',{a:1}))
	}
	
	// t2(new ResultModel())
	// t2(new ResultModel({ok:{code:111,msg:'成功'}}))
	// t2(new ResultModel({ok:{code:111,msg:'成功'},error:{code:400,msg:'错误'}}))
	
}
// test()
*/