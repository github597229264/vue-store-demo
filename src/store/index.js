import vue from 'vue';
import vuex from 'vuex';

vue.use(vuex);
//plugins
let loggerPlugin = (store)=>{
  store.subscribe((mutation,state)=>{
  })
};
const modulesFiles = require.context('./modules', true, /\.js$/);//自动引入 modules文件夹下的js文件
const modules = modulesFiles.keys().reduce((modules, modulePath) => {
const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1');
const value = modulesFiles(modulePath);
modules[moduleName] = value.default;
return modules;
}, {});
/**
 * store入口
 * @author Huangxinghui
 */
const store = new vuex.Store({
	modules,
  plugins:[loggerPlugin]
});
export default store;