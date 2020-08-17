import vue from 'vue';
/**
 * 用户中心模块
 * @author Huangxinghui
 */

const state = {//store中需要共享的组件的状态
	userData:null
};
const mutations = {//修改state中的值
	/**
	 * 操作initData 
	 * @params {Object} oOptData
	 * @params {Number} oOptData.data
	 * @params {Number} oOptData.optType ：save/del 
	 */
	set_userData(state,oOptData){
		if(oOptData.optType == 'save'){
			localStorage.setItem('userData',JSON.stringify(oOptData.data));
			if(state.userData){//判断state中的该属性是否已存在
				state.userData = oOptData.data;	
			}else{
				//state中的该属性不存在时，新增属性并赋值
				vue.set(state,'userData',oOptData.data);	
			}
		}else{
			localStorage.removeItem('userData');
			vue.delete(state,'userData')
		}
	}
};
	/**
	 * 接收组件的发送过来的请求，提交给mutations处理 
	 */
const actions = {
	/**
	 * 设置用户数据
	 * @params {Object} options 参数对象
	 * @params {Object} options.data 参数数据
	 * @params {Object} options.optType 操作类型 save/delete
	 * @return {Object} 响应数据
	 */
	 setUserData:(store, options) =>{
    	let oNewObj = {
    		data:options.optType == 'save'?options.data:[],
    		optType:options.optType||'save'
    	};
    	store.commit('set_userData',oNewObj);  
    }
};
	/**
	 * 用来获取更新后的数据
	 */
const getters = {
	/**
	 * 获取用户数据
	 */
	getUserData: (state) => {
		let aNewVal = state.userData; 
		if(!state.userData || state.userData.length == 0){
			let aLocalStorage =localStorage.getItem('userData');
			aNewVal = aLocalStorage!=null?JSON.parse(aLocalStorage):{};
		}
		return aNewVal;
	}
};
export default {
	namespaced: true, //不启用命名控件模式
	state,
	mutations,
	actions,
	getters
};