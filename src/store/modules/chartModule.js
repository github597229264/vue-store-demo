import vue from 'vue';
/**
 * 统计图模块
 * @author Huangxinghui
 */
const state = { //store中需要共享的组件的状态
	chartData:null,
	areaChartData:null
};
/**
 * 修改state中的值
 */
const mutations = {
	/*
	 * 操作chartData 
	 * @params {Object} oOptData
	 * @params {Number} oOptData.data
	 * @params {Number} oOptData.optType ：save/delete 
	 */
	set_chartData(state, oOptData) {
		if(oOptData.optType == 'save') {
			localStorage.setItem('chartData', JSON.stringify(oOptData.data));
			if(state.chartData) { //判断state中的该属性是否已存在
				state.chartData = oOptData.data;
			} else {
				//state中的该属性不存在时，新增属性并赋值
				vue.set(state, 'chartData', oOptData.data);
			}
		} else {
			localStorage.removeItem('chartData');
			vue.delete(state, 'chartData');
		}
	},
	/*
	 * 操作areaChartData 
	 * @params {Object} oOptData
	 * @params {Number} oOptData.data
	 * @params {Number} oOptData.optType ：save/delete 
	 */
	set_areaChartData(state, oOptData) {
		if(oOptData.optType == 'save') {
			localStorage.setItem("areaChartData", JSON.stringify(oOptData.data));
			if(state.areaChartData) { //判断state中的该属性是否已存在
				state.areaChartData = oOptData.data;
			} else {
				//state中的该属性不存在时，新增属性并赋值
				vue.set(state, "areaChartData", oOptData.data);
			}
		} else {
			localStorage.removeItem("areaChartData");
			vue.delete(state, "areaChartData")
		}
	}
};
/**
 * 接收组件的发送过来的请求，提交给mutations处理
 */
const actions = {
	/**
	 * 设置统计图表数据
	 * @params {Object} options 参数对象
	 * @params {Object} options.status 状态
	 * @params {Object} options.pageNow 当前页
	 * @params {Object} options.limit 页大小
	 * @params {Object} options.optType 操作类型 save/delete
	 * @return {Object} 响应数据
	 */
	setChartData: (store, options) => {
		let submitUrl = 'http://192.168.2.159:8885/api/v1/seal-system/seal-order/findAllByFinish?status=' + options.status + '&pageNow=' + options.pageNow + '&limit=' + options.limit;
		return new Promise((resolve, reject) => {
			window.vm.$axios({
				method: 'get',
				url: submitUrl
			}).then(res => {
				if(res.data.code === 20001) {
					let oNewObj = {
						data: res.data.data,
						optType: options.optType || 'save'
					};
					if(oOptData.optType == 'save'){
						//state中的该属性不存在时，新增属性并赋值
						vue.set(state,'set_chartData',oNewObj);
					}else{
						vue.delete(state,'set_chartData');
					}
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
	setChartDataNoRequest: (store, options) => {
		let oNewObj = {
			data: options.optType == 'save' ? options.data : [],
			optType: options.optType || 'save'
		};
		store.commit('set_chartData', oNewObj);
	},
	/**
	 * 设置统计图表数据
	 * @params {Object} options 参数对象
	 * @params {Object} options.data 参数数据
	 * @params {Object} options.optType 操作类型 save/delete
	 */
	setAreaChartData: (store, options) => {
		let oNewObj = {
			data: options.optType == 'save' ? options.data : [],
			optType: options.optType || 'save'
		};
		store.commit("set_areaChartData", oNewObj);
	}
};
/**
 * 用来获取更新后的数据
 */
const getters = {
	/**
	 * 获取统计图表数据
	 */
	getChartData: (state) => {
		let aNewVal = state.chartData;
		if(!state.chartData || state.chartData.length == 0) {
			let aLocalStorage =localStorage.getItem('chartData');
			aNewVal =aLocalStorage!=null?JSON.parse(aLocalStorage):[];
		}
		return aNewVal;
	},
	/**
	 * 获取区域统计图表数据
	 */
	getAreaChartData: (state) => {
		let aNewVal = state.areaChartData;
		if(!state.areaChartData || state.areaChartData.length == 0) {
			let aLocalStorage =localStorage.getItem('chartData');
			aNewVal =aLocalStorage!=null?JSON.parse(aLocalStorage):[];
		}
		return aNewVal;
	}
};
export default {
	namespaced: true, //启用命名控件模式
	state,
	mutations,
	actions,
	getters
};