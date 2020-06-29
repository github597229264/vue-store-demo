import vue from 'vue';
import * as types from '../types.js'
/**
 * 用户中心模块
 * @author Huangxinghui
 */
export default {
	namespaced:true,//不启用命名空间模式
	state:{//store中需要共享的组件的状态
		userData:[]
	},
	mutations:{//修改state中的值
		/**
		 * 操作initData 
		 * @params {Object} oOptData
		 * @params {Number} oOptData.data
		 * @params {Number} oOptData.optType ：save/del 
		 */
		[types.USERDATA](state,oOptData){
			if(oOptData.optType == 'save'){
				localStorage.setItem(types.USERDATA,JSON.stringify(oOptData.data));
				if(state[types.USERDATA]){//判断state中的该属性是否已存在
					state[types.USERDATA] = oOptData.data;	
				}else{
					//state中的该属性不存在时，新增属性并赋值
					vue.set(state,types.USERDATA,oOptData.data);	
				}
			}else{
				localStorage.removeItem(types.USERDATA);
				vue.delete(state,types.USERDATA)
			}
		}
	},
	/**
	 * 接收组件的发送过来的请求，提交给mutations处理 
	 */
	actions:{
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
        	store.commit(types.USERDATA,oNewObj);  
	    }
	},
	/**
	 * 用来获取更新后的数据
	 */
	getters:{
		/**
		 * 获取用户数据
		 */
		getUserData: (state) => {
			let aNewVal = state[types.USERDATA]; 
			if(!state[types.USERDATA] || state[types.USERDATA].length == 0){
				aNewVal = JSON.parse(localStorage.getItem(types.USERDATA));
			}
			return aNewVal;
		}
	}
}
