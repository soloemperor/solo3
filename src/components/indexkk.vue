<template>
	<div class="kk">
		<h3 class="header"><span class="back" @click="back"></span>{{name}}</h3>
		<div class="main">
			<h5 class="enkim">权利金费率：1.03%</h5>
			<div class="details">
				<div class="details_l">
					<p :class="{'red':differ > 0}">{{news}}</p>
					<span :class="{'red':differ > 0}">{{differ}}</span>&nbsp;
					<span :class="{'red':differ > 0}">{{differRange}}</span>
				</div>
				<div class="details_r">
					<p>&nbsp;高&nbsp;
						<span :class="{'red':differ > 0}">{{highest}}</span>&nbsp;开&nbsp;
						<span :class="{'red':differ > 0}">{{thisOpen}}</span>&nbsp;换手&nbsp;
						<span class="s1">{{turnover}}</span>
					</p>
					<p>&nbsp;低&nbsp;
						<span :class="{'red':differ > 0}">{{minimum}}</span>&nbsp;额&nbsp;
						<span class="s2">{{money}}</span>&nbsp;量比&nbsp;
						<span :class="{'red':differ > 0}">{{volumeRatio}}</span>
					</p>
				</div>
			</div>
			<div ref="line" style="height: 274px;width:100%"></div>
		</div>
	</div>
</template>

<script>
// 引入 ECharts 主模块
import echarts from 'echarts/lib/echarts'
// 引入柱状图
import 'echarts/lib/chart/bar'
//引入K线图
import 'echarts/lib/chart/line'
import 'echarts/lib/chart/candlestick'
//引入手动控制按钮
import 'echarts/lib/component/legend'
//引入手动控制滑块
import 'echarts/lib/component/dataZoom'
// 引入提示框和标题组件
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/title'
	export default {
		data() {
			return {
				name:'',
				news:'',
				differ:'',
				differRange:'',
				highest:'',
				thisOpen:'',
				turnover:'',
				minimum:'',
				money:'',
				volumeRatio:'',
				option : {
				    backgroundColor: '#21202D',
				    legend: {
				        data: ['分时','日K', '周K', '月K', 'M5K', 'M15K', 'M30K', 'M60K'],
//				        data: ['分时'],
				        inactiveColor: '#777',
				        textStyle: {
				            color: '#fff'
				        },
				        type:'scroll'
				    },
				    tooltip: {
				        trigger: 'axis',
				        axisPointer: {
				            animation: false,
				            type: 'cross',
				            lineStyle: {
				                color: '#376df4',
				                width: 2,
				                opacity: 1
				            }
				        }
				    },
				    xAxis: {
				        type: 'category',
				        data: [],
				        axisLine: { lineStyle: { color: '#8392A5' } }
				    },
				    yAxis: {
				        scale: true,
				        axisLine: { lineStyle: { color: '#8392A5' } },
				        splitLine: { show: true },
				        offset:-8,
				        nameTextStyle:{fontSize:4}
				    },
				    grid: {
				        bottom: 80
				    },
				    dataZoom: [{
				        textStyle: {
				            color: '#8392A5'
				        },
				        handleIcon: 'M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
				        handleSize: '80%',
				        dataBackground: {
				            areaStyle: {
				                color: '#8392A5'
				            },
				            lineStyle: {
				                opacity: 0.8,
				                color: '#8392A5'
				            }
				        },
				        handleStyle: {
				            color: '#fff',
				            shadowBlur: 3,
				            shadowColor: 'rgba(0, 0, 0, 0.6)',
				            shadowOffsetX: 2,
				            shadowOffsetY: 2
				        }
				    }, {
				        type: 'inside'
				    }],
				    animation: true,
				    series: [
				        {
				            type: 'candlestick',
				            name: '分时',
//				            type: 'line',
//				            data: [],
				            itemStyle: {
				                normal: {
				                    color: '#00dd00',//头
				                    color0: '#0CF49B',
				                    borderColor: '#00dd00',//线
				                    borderColor0: '#0CF49B'//线
				                }
				            }
				        },
				        {
				            type: 'candlestick',
				            name: '日K',
//				            type: 'line',
//				            data: [],
				            itemStyle: {
				                normal: {
				                    color: '#00ffff',//头
				                    color0: '#0CF49B',
				                    borderColor: '#00ffff',
				                    borderColor0: '#00ffff'//线
				                }
				            }
				        },
				        {
				            type: 'candlestick',
				            name: '周K',
//				            type: 'line',
//				            data: [],
				            itemStyle: {
				                normal: {
				                    color: '#0066ff',//头
				                    color0: '#0CF49B',
				                    borderColor: '#0066ff',
				                    borderColor0: '#0066ff'//线
				                }
				            }
				        },
				        {
				            type: 'candlestick',
				            name: '月K',
//				            type: 'line',
//				            data: [],
				            itemStyle: {
				                normal: {
				                    color: '#cc00ff',//头
				                    color0: '#0CF49B',
				                    borderColor: '#cc00ff',
				                    borderColor0: '#cc00ff'//线
				                }
				            }
				        },
				        {
				            type: 'candlestick',
				            name: 'M5K',
//				            type: 'line',
//				            data: [],
				            itemStyle: {
				                normal: {
				                    color: '#ff77ff',//头
				                    color0: '#0CF49B',
				                    borderColor: '#ff77ff',
				                    borderColor0: '#ff77ff'//线
				                }
				            }
				        },
				        {
				            type: 'candlestick',
				            name: 'M15K',
//				            type: 'line',
//				            data: [],
				            itemStyle: {
				                normal: {
				                    color: '#ffdd55',//头
				                    color0: '#0CF49B',
				                    borderColor: '#ffdd55',
				                    borderColor0: '#ffdd55'//线
				                }
				            }
				        },
				        {
				            type: 'candlestick',
				            name: 'M30K',
//				            type: 'line',
//				            data: [],
				            itemStyle: {
				                normal: {
				                    color: '#ff5511',//头
				                    color0: '#ff5511',
				                    borderColor: '#ff5511',
				                    borderColor0: '#ff5511'//线
				                }
				            }
				        },
				        {
				            type: 'candlestick',
				            name: 'M60K',
//				            type: 'line',
//				            data: [],
				            itemStyle: {
				                normal: {
				                    color: '#ffff00',//头
				                    color0: '#0CF49B',
				                    borderColor: '#ffff00',
				                    borderColor0: '#ffff00'//线
				                }
				            }
				        }
				    ]
				}
			}
		},
		mounted() {
			this.inItEChart()
			var that = this
//			console.log(this.$route.query.id)
//			console.log(this.$route.query.type)
			var id = this.$route.query.id
			var type = this.$route.query.type
			ajax({
				url:''+host+'/index/detail',
				type:'POST',
				data:JSON.stringify({
				    "stockId": id,
				    "type": type
				}),
				success:function(res){
					console.log(res.handicap)
					var handicap = res.handicap
					that.name = handicap.name
					that.news = handicap.news
					that.differ = handicap.differ
					that.differRange = handicap.differRange
					that.highest = handicap.highest
					that.thisOpen = handicap.thisOpen
					that.turnover = handicap.turnover
					that.minimum = handicap.minimum
					that.volumeRatio = handicap.volumeRatio
					if(handicap.money.length>=9){
						var money = handicap.money.substr(0,4)+'亿'
//						console.log(money)
						that.money = money
					}else{
						that.money = handicap.money
					}
				}
			})
		},
		methods:{
			back(){
				this.$router.push({path:'/market'})
			},
			calculateMA(dayCount, data) {
			    var result = [];
			    for (var i = 0, len = data.length; i < len; i++) {
			        if (i < dayCount) {
			            result.push('-');
			            continue;
			        }
			        var sum = 0;
			        for (var j = 0; j < dayCount; j++) {
			            sum += data[i - j][1];
			        }
			        result.push(sum / dayCount);
			    }
			    return result;
			},
			inItEChart () {
				var id = this.$route.query.id
				var that = this
				ajax({
					url:''+host+'/index/kline',
					type:'POST',
					data:JSON.stringify({
					    "stockId" : id,
					    "type" : "branchTime"
					}),
					success:function(res){
						console.log(res)
						for(var i=0;i<res.list.length;i++){
							res.list[i].time = that.fmtDate(res.list[i].time)
						}
//						console.log(res.stockHistoryList)
						var rawData_BT = res.list
						var dates = rawData_BT.map(function (item) {
						    return item.time;
						})
						var data_BT = rawData_BT.map(function (item) {
//						    return [+item.news, +item.close, +item.low, +item.ma5, +item.ma10, +item.ma20, +item.ma30];
						    return [+item.news, +item.close, +item.low, +item.ma5];
						})
						that.option.xAxis.data = dates
						that.option.series[0].data = data_BT
						let myChart = echarts.init(that.$refs.line);
						myChart.setOption(that.option)
					}
				})
				ajax({
					url:''+host+'/index/kline',
					type:'POST',
					data:JSON.stringify({
					    "stockId" : id,
					    "type" : "k"
					}),
					success:function(res){
						console.log(res)
						for(var i=0;i<res.list.length;i++){
							res.list[i].time = that.fmtDate(res.list[i].time)
						}
//						console.log(res.stockHistoryList)
						var rawData_k = res.list
						var dates = rawData_k.map(function (item) {
						    return item.time;
						})
						var data_k = rawData_k.map(function (item) {
//						    return [+item.news, +item.close, +item.low, +item.ma5, +item.ma10, +item.ma20, +item.ma30];
						    return [+item.news, +item.close, +item.low, +item.ma5];
						})
						that.option.xAxis.data = dates
						that.option.series[1].data = data_k
//						console.log(that.option.series[0].data)
						let myChart = echarts.init(that.$refs.line);
						myChart.setOption(that.option)
					}
				})
				ajax({
					url:''+host+'/index/kline',
					type:'POST',
					data:JSON.stringify({
					    "stockId" : id,
					    "type" : "WK"
					}),
					success:function(info){
						console.log(info)
						for(var i=0;i<info.list.length;i++){
							info.list[i].time = that.fmtDate(info.list[i].time)
						}
						var rawData_WK = info.list
						var dates = rawData_WK.map(function (item) {
						    return item.time;
						})
						var data_WK = rawData_WK.map(function (item) {
//								    return [+item.news, +item.close, +item.low, +item.ma5, +item.ma10, +item.ma20, +item.ma30];
						    return [+item.news, +item.close, +item.low, +item.ma5];
						})
						that.option.xAxis.data = dates
						that.option.series[2].data = data_WK
						console.log(that.option.series[2].data)
						let myChart = echarts.init(that.$refs.line);
						myChart.setOption(that.option)
					}
				})
				ajax({
					url:''+host+'/index/kline',
					type:'POST',
					data:JSON.stringify({
					    "stockId" : id,
					    "type" : "MK"
					}),
					success:function(res){
						console.log(res)
						for(var i=0;i<res.list.length;i++){
							res.list[i].time = that.fmtDate(res.list[i].time)
						}
						var rawData_MK = res.list
						var dates = rawData_MK.map(function (item) {
						    return item.time;
						})
						var data_MK = rawData_MK.map(function (item) {
//								    return [+item.news, +item.close, +item.low, +item.ma5, +item.ma10, +item.ma20, +item.ma30];
						    return [+item.news, +item.close, +item.low, +item.ma5];
						})
						that.option.xAxis.data = dates
						that.option.series[3].data = data_MK
						let myChart = echarts.init(that.$refs.line);
						myChart.setOption(that.option)
					}
				})
				ajax({
					url:''+host+'/index/kline',
					type:'POST',
					data:JSON.stringify({
					    "stockId" : id,
					    "type" : "M5K"
					}),
					success:function(res){
						console.log(res)
						for(var i=0;i<res.list.length;i++){
							res.list[i].time = that.fmtDate(res.list[i].time)
						}
						var rawData_M5K = res.list
						var dates = rawData_M5K.map(function (item) {
						    return item.time;
						})
						var data_M5K = rawData_M5K.map(function (item) {
//								    return [+item.news, +item.close, +item.low, +item.ma5, +item.ma10, +item.ma20, +item.ma30];
						    return [+item.news, +item.close, +item.low, +item.ma5];
						})
						that.option.xAxis.data = dates
						that.option.series[4].data = data_M5K
						let myChart = echarts.init(that.$refs.line);
						myChart.setOption(that.option)
					}
				})
				ajax({
					url:''+host+'/index/kline',
					type:'POST',
					data:JSON.stringify({
					    "stockId" : id,
					    "type" : "M15K"
					}),
					success:function(res){
						console.log(res)
						for(var i=0;i<res.list.length;i++){
							res.list[i].time = that.fmtDate(res.list[i].time)
						}
						var rawData_M15K = res.list
						var dates = rawData_M15K.map(function (item) {
						    return item.time;
						})
						var data_M15K = rawData_M15K.map(function (item) {
//								    return [+item.news, +item.close, +item.low, +item.ma5, +item.ma10, +item.ma20, +item.ma30];
						    return [+item.news, +item.close, +item.low, +item.ma5];
						})
						that.option.xAxis.data = dates
						that.option.series[5].data = data_M15K
						let myChart = echarts.init(that.$refs.line);
						myChart.setOption(that.option)
					}
				})
				ajax({
					url:''+host+'/index/kline',
					type:'POST',
					data:JSON.stringify({
					    "stockId" : id,
					    "type" : "M30K"
					}),
					success:function(res){
						console.log(res)
						for(var i=0;i<res.list.length;i++){
							res.list[i].time = that.fmtDate(res.list[i].time)
						}
						var rawData_M30K = res.list
						var dates = rawData_M30K.map(function (item) {
						    return item.time;
						})
						var data_M30K = rawData_M30K.map(function (item) {
//								    return [+item.news, +item.close, +item.low, +item.ma5, +item.ma10, +item.ma20, +item.ma30];
						    return [+item.news, +item.close, +item.low, +item.ma5];
						})
						that.option.xAxis.data = dates
						that.option.series[6].data = data_M30K
						let myChart = echarts.init(that.$refs.line);
						myChart.setOption(that.option)
					}
				})
				ajax({
					url:''+host+'/index/kline',
					type:'POST',
					data:JSON.stringify({
					    "stockId" : id,
					    "type" : "M60K"
					}),
					success:function(res){
						console.log(res)
						for(var i=0;i<res.list.length;i++){
							res.list[i].time = that.fmtDate(res.list[i].time)
						}
						var rawData_M60K = res.list
						var dates = rawData_M60K.map(function (item) {
						    return item.time;
						})
						var data_M60K = rawData_M60K.map(function (item) {
//								    return [+item.news, +item.close, +item.low, +item.ma5, +item.ma10, +item.ma20, +item.ma30];
						    return [+item.news, +item.close, +item.low, +item.ma5];
						})
						that.option.xAxis.data = dates
						that.option.series[7].data = data_M60K
						let myChart = echarts.init(that.$refs.line);
						myChart.setOption(that.option)
					}
				})
			},
			fmtDate(time){
			    var date =  new Date(time);
			    var y = 1900+date.getYear();
			    var m = "0"+(date.getMonth()+1);
			    var d = "0"+date.getDate();
			    return y+"-"+m.substring(m.length-2,m.length)+"-"+d.substring(d.length-2,d.length);
			}
		}
		
	}
</script>

<style scoped>
	.kk{
		width:100%;
		height:100%;
		background:#252528;
		position: relative;
	}
	.header{
		width:100%;
		height:0.87rem;
		background:#1b1b20;
		font:0.35rem/0.87rem "";
		color:#fff;
		position: relative;
	}
	.header .back{
		width:0.22rem;
		height:0.37rem;
		background:url(../assets/left.png) no-repeat left center;
		background-size:0.22rem 0.37rem;
		position: absolute;
		top:0.26rem;
		left:0.38rem;
	}
	.main{
		width:100%;
		height:100%;
		background:#252528;
	}
	.main .enkim{
		height:0.77rem;
		font:0.28rem/0.77rem "";
		color:#fff;
		text-align: left;
		margin-left:0.3rem;
		display: none;
	}
	.main .details{
		width:100%;
		height:1rem;
		background: #1b1b20;
		display: flex;
		flex-wrap: nowrap;
		justify-content: space-around;
		margin-bottom:0.8rem;
	}
	.kk .main .details .red{
		color:#FD4331;
	}
	/*.kk .main .details .red span{
		color:#FD4331;
	}*/
	.main .details .details_l{
		width:35%;
	}
	.main .details .details_l p{
		font:600 0.5rem ""; 
		color:#090;
	}
	.main .details span{
		font-size:0.24rem;
		color:#090;
	}
	.main .details .details_r{
		width:80%;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}
	.main .details .details_r p{
		font:0.26rem/0.5rem "";
		color:#999;
		text-align: left;
	}
	.main .details .details_r .s1{
		color:#999;
	}
	.main .details .details_r .s2{
		color:#999;
	}
	.kk .footerbtn{
		width:100%;
		height:1.2rem;
		position: fixed;
		bottom:0;
		left:0;
		display: flex;
		flex-wrap: nowrap;
		justify-content: space-around;
	}
	.kk .footerbtn div{
		flex: 1;
	}
	.kk .footerbtn button{
		width:1.8rem;
		height:0.66rem;
		font-size:0.34rem;
		color:#fff;
		margin:0 auto;
		outline: none;
		border:0;
		border-radius: 0.06rem;
	}
	.kk .footerbtn .purchase{
		background:#e93030;
	}
	.kk .footerbtn .addoptional{
		background:#4691ee;
		display: none;
	}
	.kk .footerbtn .guadan{
		background:#646464;
	}
</style>