const getters = {
	chartData:state => state.chartModule,
	areaChartData:state => state.chartModule,
	userData:state => state.userModule.userData
};
export default getters;