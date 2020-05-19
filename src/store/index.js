import vue from 'vue';
import vuex from 'vuex';

import chartModules from './chartModule.js';
import userModules from './userModule.js';
vue.use(vuex);
//plugins
let loggerPlugin = (store)=>{
  store.subscribe((mutation,state)=>{
  })
};

/**
 * store入口
 * @author Huangxinghui
 */
const store = new vuex.Store({
	modules:{
		chartCenter:chartModules,//统计图模块    chartCenter为命名空间名称--当namespaced:true时，调用该模块下的actions和getters中的方法需要加chartCenter前缀
		userCenter:userModules//用户模块
	},
  plugins:[loggerPlugin]
});
export default store;