<template>
	<div class="storeDemo">
		<h1>统计图表模块测试store</h1>
		<el-button type="primary" @click="saveChartForActionsRequest">actions异步请求方式保存state</el-button>
		<el-button type="primary" @click="saveChartForActions">action传递数据方式保存state</el-button>
		<el-button type="primary" @click="deleteChartForActions">删除state中的指定数据</el-button>
		<router-link to="/user">
	      <button class="button">点击跳转到用户模块</button>
	 	</router-link>
		<div class="tableArea">
			<el-table :data="tableData">
				<el-table-column prop="orderId" label="orderId" min-width="180">
				</el-table-column>
				<el-table-column prop="orderNo" label="orderNo" min-width="180">
				</el-table-column>
				<el-table-column prop="username" label="username" min-width="180">
				</el-table-column>
			</el-table>	
		</div>
		
	</div>
</template>

<script>
	export default {
		name: 'chart',
		data() {
			return {
				tableData:[]
			}
		},
		mounted(){
			//
			let storeChart = this.$store.getters['chartCenter/getChartData'];
			this.tableData = storeChart!=null?storeChart.list:[];
		},
		methods: {
			/**
			 * actions异步请求方式保存state 
			 */
			saveChartForActionsRequest() {
				let oParams = {
					status: 1,
					pageNow: 1,
					limit: 10
				};
				this.$store.dispatch("setChartData", oParams)
				.then(res => {
		      		let storeChart = this.$store.getters['chartCenter/getChartData'];
					this.tableData = storeChart!=null?storeChart.list:[];
		   		});
			},
			/**
			 * action传递数据方式保存state 
			 */
			saveChartForActions() {
				let tables = {
					list:[
						{
							orderId: 58,
							orderNo: 20200515172308406,
							username: "张三"
						},
						{
							orderId: 59,
							orderNo: 20200515172308407,
							username: "张萨博"
						}
					]
				};
				let oParams = {
					data:tables,
					optType:'save'
				};
				this.$store.dispatch("chartModule/setChartDataNoRequest", oParams);
				let storeChart = this.$store.getters['chartModule/getChartData'];
				this.tableData = storeChart!=null?storeChart.list:[];
			},
			/*
			 * 删除state中的指定数据
			 */
			deleteChartForActions() {
				let oParams = {
					data:[],
					optType:'delete'
				};
				this.$store.dispatch("chartCenter/setChartDataNoRequest", oParams);
				let storeChart = this.$store.getters['chartCenter/getChartData'];
				this.tableData = storeChart!=null?storeChart.list:[];
			}
		}
	}
</script>
<style scoped>
	.storeDemo{
		text-align: center;
	}
	.tableArea{
		width: 50%;
		margin: 50px auto 0;
	}
</style>