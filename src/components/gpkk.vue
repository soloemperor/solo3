<template>
	<div class="kk">
		<h3 class="header"><span class="back" @click="back"></span>{{stockName}}</h3>
		<div class="main">
			<h5 class="enkim">权利金费率：{{stockRebate}}%</h5>
			<div class="details">
				<div class="details_l">
					<p :class="{'red':differ > 0}">{{stockNow}}</p>
					<span :class="{'red':differ > 0}">{{differ}}</span>&nbsp;
					<span :class="{'red':differ > 0}">{{differRange}}</span>
				</div>
				<div class="details_r">
					<p>&nbsp;高&nbsp;
						<span :class="{'red':differ > 0}">{{height}}</span>&nbsp;开&nbsp;
						<span :class="{'red':differ > 0}">{{open}}</span>
						<!--&nbsp;换手&nbsp;
						<span class="s1">0.75%</span>-->
					</p>
					<p>&nbsp;低&nbsp;
						<span :class="{'red':differ > 0}">{{low}}</span>&nbsp;额&nbsp;
						<span class="s2">{{amount}}</span>&nbsp;量比&nbsp;
						<span :class="{'red':differ > 0}">{{quantity}}</span>
					</p>
				</div>
			</div>
			<div class="main_m">
				<div class="ks" ref="line" style="width:80%;">
					<!--<div class="chart">-->
						<!--<div id="column" class="show" ></div>-->
						<!--<div id="k-line" ></div>-->
						<!--<div id="week"></div>
						<div id="month"></div>-->
					<!--</div>-->
				</div>
				<div class="right">
					<p class="tab"><span class="five" @click="five" ref="five">五档</span><span class="mx" ref="mx" @click="mx">明细</span></p>
					<div class="tabwin">
						<div class="five_main" ref="five_main">
							<ul class="fivenum">
								<li>卖5</li>
								<li>卖4</li>
								<li>卖3</li>
								<li>卖2</li>
								<li>卖1</li>
								<li>买1</li>
								<li>买2</li>
								<li>买3</li>
								<li>买4</li>
								<li>买5</li>
							</ul>
							<div class="fivelistmain">
								<ul class="fivelistsale">
									<li v-for="item in fiveSale"><span class="sa">{{item.amount}}</span>&nbsp;<span class="sc">{{item.countVol}}</span></li>
								</ul>
								<ul class="fivelistbuy">
									<li v-for="item in fiveBuy"><span class="sm">{{item.amount}}</span>&nbsp;<span class="sc">{{item.countVol}}</span></li>
								</ul>
							</div>
						</div>
						<div class="mx_main" ref="mx_main">
							<ul class="mxlist">
								<li v-for="item in dealDetail">
									<span class="time">{{item.time}}</span>&nbsp;
									<span class="money">{{item.money}}</span>&nbsp;							
									<span class="hand">{{item.hand}}</span>
								</li>
							</ul>
						</div>
					</div>
					
				</div>
			</div>
			
		</div>
		<div class="footerbtn">
			<div><button class="purchase" @click="purchase">买入</button></div>
			<div><button class="addoptional" ref="addoptional" @click="addoptional">加入自选</button></div>
			<div><button class="guadan" @click="guadan">挂单</button></div>
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
import 'echarts/lib/component/legendScroll'
//引入手动控制滑块
import 'echarts/lib/component/dataZoom'
// 引入提示框和标题组件
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/title'
	export default {
		data() {
			return {
				stockName:'',
				stockRebate:'',
				stockNow:'',
				differ:'',
				differRange:'',
				height:'',
				open:'',
				low:'',
				amount:'',
				quantity:'',
				fiveSale:[],
				fiveBuy:[],
				dealDetail:[],
				centerId:'',
    		    userNumber:'',
				option : {
				    backgroundColor: '#21202D',
				    legend: {
				        data: ['日K', '周K', '月K', 'M5K', 'M15K', 'M30K', 'M60K', '分时'],
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
				        offset:-12,
				        nameTextStyle:{fontSize:6}
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
				            name: '日K',
				            data: [],
				            itemStyle: {
				                normal: {
				                    color: '#FD1050',
				                    color0: '#0CF49B',
				                    borderColor: '#FD1050',
				                    borderColor0: '#0CF49B'
				                }
				            }
				        },
				        {
				            name: '周K',
				            type: 'line',
//				            data: calculateMA(5, data),
				            smooth: true,
				            showSymbol: false,
				            lineStyle: {
				                normal: {
				                    width: 1
				                }
				            }
				        },
				        {
				            name: '月K',
				            type: 'line',
//				            data: calculateMA(10, data),
				            smooth: true,
				            showSymbol: false,
				            lineStyle: {
				                normal: {
				                    width: 1
				                }
				            }
				        },
				        {
				            name: 'M5K',
				            type: 'line',
//				            data: calculateMA(20, data),
				            smooth: true,
				            showSymbol: false,
				            lineStyle: {
				                normal: {
				                    width: 1
				                }
				            }
				        },
				        {
				            name: 'M15K',
				            type: 'line',
//				            data: calculateMA(30, data),
				            smooth: true,
				            showSymbol: false,
				            lineStyle: {
				                normal: {
				                    width: 1
				                }
				            }
				        },
				        {
				            name: 'M30K',
				            type: 'line',
//				            data: calculateMA(30, data),
				            smooth: true,
				            showSymbol: false,
				            lineStyle: {
				                normal: {
				                    width: 1
				                }
				            }
				        },
				        {
				            name: 'M60K',
				            type: 'line',
//				            data: calculateMA(30, data),
				            smooth: true,
				            showSymbol: false,
				            lineStyle: {
				                normal: {
				                    width: 1
				                }
				            }
				        },
				        {
				            name: '分时',
				            type: 'line',
//				            data: calculateMA(5, data),
				            smooth: true,
				            showSymbol: false,
				            lineStyle: {
				                normal: {
				                    width: 1
				                }
				            }
				        }
				    ]
				}
			}
		},
		mounted() {
			this.centerId = this.$getUrl().centerId
  			this.userNumber = this.$getUrl().userNumber
			this.inItEChart ()
			const that = this
//			console.log(this.$route.query.stockId)
			var stockId = this.$route.query.stockId
//			console.log(typeof stockId)
			ajax({
				url:''+host+'/stock/detail',
				type:'POST',
				data:JSON.stringify({
				    "stockId" : stockId,
				    "userNumber": that.userNumber
				}),
				success:function(res){
//					console.log(res)
//					console.log(res.flag);
					if(res.flag == false){
//						console.log(9999)
						that.$refs.addoptional.style.display = "block"
					}
					that.stockName = res.stock.stockName
					that.stockRebate = res.stock.rebate
					that.stockNow = res.stock.now
					that.differ = res.stock.differ
					that.differRange = res.stock.differRange
					that.height = res.stockDetail.height
					that.open = res.stockDetail.open
					that.low = res.stockDetail.low
					that.amount = res.stockDetail.amount
					that.quantity = res.stockDetail.quantity
					that.fiveSale = res.fiveSale
					that.fiveBuy = res.fiveBuy
					that.dealDetail = res.dealDetail
				}
			})
		},
		methods:{
			back(){
				var router = this.$route.query.router
				var searchVal = this.$route.query.searchVal
				if(!router){
					this.$router.push({path:'/optional'})
				}else{
					this.$router.push({path:'/'+router+'',query:{searchVal:searchVal}})
				}
//				console.log(searchVal)
				
			},
			addoptional:function(stockid){
//				console.log(stockid);
				var stockId = this.$route.query.stockId
				var that = this
				ajax({
					url:''+host+'/userStock/addUserStock',
					type:"POST",
					data:JSON.stringify({
					    "userNumber": that.userNumber,
					    "stockId":stockId
					}),
					contentType: "application/json;charset=UTF-8",
					success:function(res){
//						console.log(res);
						that.$refs.addoptional.style.display = "none"						
					}
				});
			},
			five(){
				this.$refs.five.style.cssText = "color:#999;border-bottom:2px solid #fd4331;"
				this.$refs.mx.style.cssText = "color:#fff;border-bottom:2px solid #252528;"
				this.$refs.five_main.style.display = "block"
				this.$refs.mx_main.style.display = "none"
			},
			mx(){
				this.$refs.five.style.cssText = "color:#fff;border-bottom:2px solid #252528;"
				this.$refs.mx.style.cssText = "color:#999;border-bottom:2px solid #fd4331;"
				this.$refs.five_main.style.display = "none"
				this.$refs.mx_main.style.display = "block"
			},
			purchase(){
				var stockId = this.$route.query.stockId
				this.$router.push({path:'/placeorder',query:{stockid:stockId}})
			},
			guadan(){
				var stockId = this.$route.query.stockId
				this.$router.push({path:'/guadan',query:{stockid:stockId}})
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
				var stockId = this.$route.query.stockId
				var that = this
				ajax({
					url:''+host+'/stock/kline',
					type:'POST',
					data:JSON.stringify({
					    "stockId" : stockId,
					    "type" : "k"
					}),
					success:function(res){
//						console.log(res.stockHistoryList)
						for(var i=0;i<res.stockHistoryList.length;i++){
							res.stockHistoryList[i].updateTime = that.fmtDate(res.stockHistoryList[i].updateTime)
						}
//						console.log(res.stockHistoryList)
						var rawData_k = res.stockHistoryList
						var dates = rawData_k.map(function (item) {
						    return item.updateTime;
						})
						var data_k = rawData_k.map(function (item) {
						    return [+item.price, +item.closing, +item.lowest, +item.highest];
						})
						that.option.xAxis.data = dates
						that.option.series[0].data = data_k
						let myChart = echarts.init(that.$refs.line);
						myChart.setOption(that.option)
						ajax({
							url:''+host+'/stock/kline',
							type:'POST',
							data:JSON.stringify({
							    "stockId" : stockId,
							    "type" : "WK"
							}),
							success:function(res){
//								console.log(res)
								for(var i=0;i<res.stockHistoryList.length;i++){
									res.stockHistoryList[i].updateTime = that.fmtDate(res.stockHistoryList[i].updateTime)
								}
								var rawData_WK = res.stockHistoryList
								var dates = rawData_WK.map(function (item) {
								    return item.updateTime;
								})
								var data_WK = rawData_WK.map(function (item) {
								    return [+item.price, +item.closing, +item.lowest, +item.highest];
								})
								that.option.xAxis.data = dates
								that.option.series[1].data = data_WK
								let myChart = echarts.init(that.$refs.line);
								myChart.setOption(that.option)
							}
						})
						ajax({
							url:''+host+'/stock/kline',
							type:'POST',
							data:JSON.stringify({
							    "stockId" : stockId,
							    "type" : "MK"
							}),
							success:function(res){
//								console.log(res)
								for(var i=0;i<res.stockHistoryList.length;i++){
									res.stockHistoryList[i].updateTime = that.fmtDate(res.stockHistoryList[i].updateTime)
								}
								var rawData_MK = res.stockHistoryList
								var dates = rawData_MK.map(function (item) {
								    return item.updateTime;
								})
								var data_MK = rawData_MK.map(function (item) {
								    return [+item.price, +item.closing, +item.lowest, +item.highest];
								})
								that.option.xAxis.data = dates
								that.option.series[2].data = data_MK
								let myChart = echarts.init(that.$refs.line);
								myChart.setOption(that.option)
							}
						})
						ajax({
							url:''+host+'/stock/kline',
							type:'POST',
							data:JSON.stringify({
							    "stockId" : stockId,
							    "type" : "M5K"
							}),
							success:function(res){
//								console.log(res)
								for(var i=0;i<res.stockHistoryList.length;i++){
									res.stockHistoryList[i].updateTime = that.fmtDate(res.stockHistoryList[i].updateTime)
								}
								var rawData_M5K = res.stockHistoryList
								var dates = rawData_M5K.map(function (item) {
								    return item.updateTime;
								})
								var data_M5K = rawData_M5K.map(function (item) {
								    return [+item.price, +item.closing, +item.lowest, +item.highest];
								})
								that.option.xAxis.data = dates
								that.option.series[3].data = data_M5K
								let myChart = echarts.init(that.$refs.line);
								myChart.setOption(that.option)
							}
						})
						ajax({
							url:''+host+'/stock/kline',
							type:'POST',
							data:JSON.stringify({
							    "stockId" : stockId,
							    "type" : "M15K"
							}),
							success:function(res){
//								console.log(res)
								for(var i=0;i<res.stockHistoryList.length;i++){
									res.stockHistoryList[i].updateTime = that.fmtDate(res.stockHistoryList[i].updateTime)
								}
								var rawData_M15K = res.stockHistoryList
								var dates = rawData_M15K.map(function (item) {
								    return item.updateTime;
								})
								var data_M15K = rawData_M15K.map(function (item) {
								    return [+item.price, +item.closing, +item.lowest, +item.highest];
								})
								that.option.xAxis.data = dates
								that.option.series[4].data = data_M15K
								let myChart = echarts.init(that.$refs.line);
								myChart.setOption(that.option)
							}
						})
						ajax({
							url:''+host+'/stock/kline',
							type:'POST',
							data:JSON.stringify({
							    "stockId" : stockId,
							    "type" : "M30K"
							}),
							success:function(res){
								console.log(res)
								for(var i=0;i<res.stockHistoryList.length;i++){
									res.stockHistoryList[i].updateTime = that.fmtDate(res.stockHistoryList[i].updateTime)
								}
								var rawData_M30K = res.stockHistoryList
								var dates = rawData_M30K.map(function (item) {
								    return item.updateTime;
								})
								var data_M30K = rawData_M30K.map(function (item) {
								    return [+item.price, +item.closing, +item.lowest, +item.highest];
								})
								that.option.xAxis.data = dates
								that.option.series[5].data = data_M30K
								let myChart = echarts.init(that.$refs.line);
								myChart.setOption(that.option)
							}
						})
						ajax({
							url:''+host+'/stock/kline',
							type:'POST',
							data:JSON.stringify({
							    "stockId" : stockId,
							    "type" : "M60K"
							}),
							success:function(res){
								console.log(res)
								for(var i=0;i<res.stockHistoryList.length;i++){
									res.stockHistoryList[i].updateTime = that.fmtDate(res.stockHistoryList[i].updateTime)
								}
								var rawData_M60K = res.stockHistoryList
								var dates = rawData_M60K.map(function (item) {
								    return item.updateTime;
								})
								var data_M60K = rawData_M60K.map(function (item) {
								    return [+item.price, +item.closing, +item.lowest, +item.highest];
								})
								that.option.xAxis.data = dates
								that.option.series[6].data = data_M60K
								let myChart = echarts.init(that.$refs.line);
								myChart.setOption(that.option)
//								function refreshData(data){
//								    if(!myChart){
//								        return;
//								    }
//								     
//								  //更新数据
//								    var option = myChart.getOption();
//								    option.series[0].data = data;   
//								    myChart.setOption(option);    
//								}
							}
						})
						ajax({
							url:''+host+'/stock/kline',
							type:'POST',
							data:JSON.stringify({
							    "stockId" : stockId,
							    "type" : "branchTime"
							}),
							success:function(res){
								console.log(res)
								for(var i=0;i<res.stockHistoryList.length;i++){
									res.stockHistoryList[i].updateTime = that.fmtDate(res.stockHistoryList[i].updateTime)
								}
								var rawData_BT = res.stockHistoryList
								var dates = rawData_BT.map(function (item) {
								    return item.updateTime;
								})
								var data_BT = rawData_BT.map(function (item) {
								    return [+item.price, +item.closing, +item.lowest, +item.highest];
								})
								that.option.xAxis.data = dates
								that.option.series[7].data = data_BT
								let myChart = echarts.init(that.$refs.line);
							}
						})
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
		/*display: none;*/
	}
	.main .details{
		width:100%;
		height:1rem;
		background: #1b1b20;
		display: flex;
		flex-wrap: nowrap;
		justify-content: space-around;
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
		font-size:0.3rem;
		color:#090;
	}
	.main .details .details_r{
		width:65%;
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
	.main .main_m{
		width:100%;
		display: flex;
		flex-wrap: nowrap;
		justify-content: space-around;
	}
	.mian .main_m .ks{
		width:70%;
	}
	.mian .main_m .ks .chart{
		width: 100%;
		height: 100%;
		border-bottom: 2px solid #f5f5f5;
	}
	.mian .main_m .ks #column{
		width: 100%;
		height: 100%;
		display: none;
	}
	.mian .main_m .ks .show{
		display: block !important;
	}
	.main .main_m .right{
		width:30%;
		height:7.2rem;
		border-left:2px solid #2e2e32;
		overflow: auto;
	}
	.main .main_m .right .tab span{
		font-size:0.26rem;
		color:#fff;
		display: inline-block;
		margin:0.1rem 0.15rem 0;
	}
	.main .main_m .right .tab span.five{
		color:#999;
		border-bottom: 2px solid #FD4331;
	}
	.main .main_m .right .tab span.mx{
		border-bottom: 2px solid #252528;
	}
	.main .main_m .right .tabwin{
		position: relative;
	}
	.main .main_m .right .tabwin .five_main{
		position: absolute;
		left:0;
		top:0;
		/*border-left: 2px solid #2e2e32;*/
		font-size:0.2rem;
	}
	.main .main_m .right .tabwin .five_main ul li{
		margin:0.3rem 0;
		
	}
	.main .main_m .right .tabwin .five_main .fivenum{
		float: left;
		/*width:45%;*/
		color:#fff;
	}
	.main .main_m .right .tabwin .five_main .fivelistmain{
		float: left;
		/*width:50%;*/
		text-align: left;
	}
	.main .main_m .right .tabwin .five_main .fivelistmain .fivelistsale{
		
	}
	.main .main_m .right .tabwin .five_main .fivelistmain .fivelistsale li .sa{
		color:#FD4331;
	}
	.main .main_m .right .tabwin .five_main .fivelistmain .fivelistsale li .sc{
		color:#4691ee;
	}
	.main .main_m .right .tabwin .five_main .fivelistmain .fivelistbuy li .sm{
		color:#090;
	}
	.main .main_m .right .tabwin .five_main .fivelistmain .fivelistbuy li .sc{
		color:#4691ee;
	}
	.main .main_m .right .tabwin .mx_main{
		position: absolute;
		left:0;
		top:0;
		display: none;
		text-align: left;
	}
	.main .main_m .right .tabwin .mx_main .mxlist li{
		margin:0.1rem 0;
	}
	.main .main_m .right .tabwin .mx_main .mxlist li span{
		font-size:0.2rem;
	}
	.main .main_m .right .tabwin .mx_main .mxlist li span.time{
		color:#fff;
	}
	.main .main_m .right .tabwin .mx_main .mxlist li span.money{
		color:#fd4331;
	}
	.main .main_m .right .tabwin .mx_main .mxlist li span.hand{
		color:#090;
	}
	/*.main .main_m .right .tabwin .mx_main .mxlist .green span{
		color:#090;
	}*/
</style>