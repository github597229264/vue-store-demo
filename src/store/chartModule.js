import vue from 'vue';
import * as types from './types.js'
/**
 * 统计图模块
 * @author Huangxinghui
 */
export default {
	namespaced:true,//启用命名空间模式
	state:{//store中需要共享的组件的状态
	},
	/**
	 * 修改state中的值
	 */
	mutations:{
		/*
		 * 操作chartData 
		 * @params {Object} oOptData
		 * @params {Number} oOptData.data
		 * @params {Number} oOptData.optType ：save/delete 
		 */
		[types.CHARTDATA](state,oOptData){
			if(oOptData.optType == 'save'){
				localStorage.setItem(types.CHARTDATA,JSON.stringify(oOptData.data));
				if(state[types.CHARTDATA]){//判断state中的该属性是否已存在
					state[types.CHARTDATA] = oOptData.data;	
				}else{
					//state中的该属性不存在时，新增属性并赋值
					vue.set(state,types.CHARTDATA,oOptData.data);	
				}
			}else{
				localStorage.removeItem(types.CHARTDATA);
				vue.delete(state,types.CHARTDATA);
			}
		},
		/*
		 * 操作areaChartData 
		 * @params {Object} oOptData
		 * @params {Number} oOptData.data
		 * @params {Number} oOptData.optType ：save/delete 
		 */
		[types.AREACHARTDATA](state,oOptData){
			if(oOptData.optType == 'save'){
				localStorage.setItem(types.AREACHARTDATA,JSON.stringify(oOptData.data));
				if(state[types.AREACHARTDATA]){//判断state中的该属性是否已存在
					state[types.AREACHARTDATA] = oOptData.data;	
				}else{
					//state中的该属性不存在时，新增属性并赋值
					vue.set(state,types.AREACHARTDATA,oOptData.data);	
				}
			}else{
				localStorage.removeItem(types.AREACHARTDATA);
				vue.delete(state,types.AREACHARTDATA)
			}
		}
	},
	/**
	 * 接收组件的发送过来的请求，提交给mutations处理
	 */
	actions:{
		/**
		 * 设置统计图表数据
		 * @params {Object} options 参数对象
		 * @params {Object} options.status 状态
		 * @params {Object} options.pageNow 当前页
		 * @params {Object} options.limit 页大小
		 * @params {Object} options.optType 操作类型 save/delete
		 * @return {Object} 响应数据
		 */
		 setChartData:(store, options) =>{
		 	let submitUrl = 'http://192.168.2.159:8885/api/v1/seal-system/seal-order/findAllByFinish?status='+options.status+'&pageNow='+options.pageNow+'&limit='+options.limit;
	        return new Promise((resolve, reject) => {
		        	window.vm.$axios({
					method: 'get',
					url: submitUrl
				}).then(res => {
		            if (res.data.code === 20001) {
		            	let oNewObj = {
		            		data:res.data.data,
		            		optType:options.optType||'save'
		            	};
		            	store.commit(types.CHARTDATA,oNewObj);
		            }
		            resolve(res);
		       });
	       });
	    },
		/**
		 * 设置统计图表数据(非请求数据)
		 * @params {Object} options 参数对象
		 * @params {Object} options.data 参数数据
		 * @params {Object} options.optType 操作类型 save/delete
		 * @return {Object} 响应数据
		 */
		setChartDataNoRequest:(store, options) =>{
        	let oNewObj = {
        		data:options.optType == 'save'?options.data:[],
        		optType:options.optType||'save'
        	};
        	store.commit(types.CHARTDATA,oNewObj);
	    },
		/**
		 * 设置统计图表数据
		 * @params {Object} options 参数对象
		 * @return {Object} 响应数据
		 */
		 setAreaChartData:(store, options) =>{
        	let oNewObj = {
        		data:options,
        		optType:'save'
        	};
        	store.commit(types.AREACHARTDATA,oNewObj);
	    }
	},
	/**
	 * 用来获取更新后的数据
	 */
	getters:{
		/**
		 * 获取统计图表数据
		 */
		getChartData: (state) => {
			let aNewVal = state[types.CHARTDATA]; 
			if(!state[types.CHARTDATA] || state[types.CHARTDATA].length == 0){
				aNewVal = JSON.parse(localStorage.getItem(types.CHARTDATA));
			}
			return aNewVal;
		},
		/**
		 * 获取区域统计图表数据
		 */
		getAreaChartData: (state) => {
			let aNewVal = state[types.AREACHARTDATA]; 
			if(!state[types.AREACHARTDATA] || state[types.AREACHARTDATA].length == 0){
				aNewVal = JSON.parse(localStorage.getItem(types.AREACHARTDATA));
			}
			return aNewVal;
		}
	}
}
