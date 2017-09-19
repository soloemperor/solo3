<template>
	<div class="orderdetails">
		<h3 class="header"><span class="back" @click="back"></span>订单详情</h3>
		<div class="main">
			<ul class="identification">
				<li><p class="ordernum p1">业务订单号</p><p class="orderNum p2">{{toiCode}}</p></li>
				<li><p class="ordertime p1">下单日期</p><p class="orderTime p2">{{toiAddTime}}</p></li>
				<li><p class="orderstate p1">方案状态</p><p class="orderState p2" ref="zt"></p></li>
			</ul>
			<div class="ordercard">
				<h5><span class="s2">权利金：{{toiOptionMoney}}</span><span class="s3">收益：<span class="s4" ref="toiProfit"></span></span></h5>
				<span><p class="p1">股票代码</p><p class="p2">{{toiStockId}}</p></span>
				<span><p class="p1">股票名称</p><p class="p2">{{stockName}}</p></span>
				<span><p class="p1">买入手数</p><p class="p2">{{toiNum}}</p></span>
				<span><p class="p1">生效日期</p><p class="p2" ref="toiDurTime"></p></span>
				<span><p class="p1">到期日期</p><p class="p2" ref="toiEndTime1"></p></span>
				<span><p class="p1">期初价格</p><p class="p2">{{toiBuyPoint}}</p></span>
				<span ref="toiExercisePoint1"><p class="p1">期末价格</p><p class="p2" ref="toiExercisePoint_1"></p></span>
				<span ref="toiMethodType1"><p class="p1">结算方式</p><p class="p2" ref="toiMethodType_1"></p></span>
				<span ref="toiExercisePoint2"><p class="p1">行权价格</p><p class="p2" ref="toiExercisePoint_2"></p></span>
				<span><p class="p1">行权日期</p><p class="p2" ref="toiEndTime2"></p></span>
				<button class="cardbtn" @click="cardbtn" ref="cardbtn">行权</button>
			</div>
		</div>
	</div>
</template>

<script>
	export default{
		data(){
			return{
				toiCode:'',
				toiAddTime:'',
				toiOptionMoney:'',
				toiProfit:'',
				toiStockId:'',
				stockName:'',
				toiNum:'',
				toiBuyPoint:'',
				centerId:'',
    		    userNumber:''
			}
		},
		created(){
		},
		mounted(){
			this.centerId = this.$getUrl().centerId
  			this.userNumber = this.$getUrl().userNumber
			var orderId = this.$route.query.orderId
			var that = this
			ajax({
				url:''+host+'/order/getOrderDetail',
				type:'POST',
				data:JSON.stringify({
				    "userNumber": that.userNumber,
				    "orderId" : orderId
				}),
				success:function(res){	
					console.log(res)
					if(res.result!=null){
						if(res.result.toiAddTime!=null){
							res.result.toiAddTime = that.fmtDate(res.result.toiAddTime)
						}
//						console.log(that.$refs.toiEndTime)
						if(res.result.toiEndTime!=null){
							that.$refs.toiEndTime1.innerHTML = that.fmtDate(res.result.toiEndTime)
							that.$refs.toiEndTime2.innerHTML = that.fmtDate(res.result.toiEndTime)
						}else if(res.result.toiEndTime==null){
							that.$refs.toiEndTime1.innerHTML = "--"
							that.$refs.toiEndTime2.innerHTML = "--"
						}
						if(res.result.toiDurTime!=null){
							that.$refs.toiDurTime.innerHTML = that.fmtDate(res.result.toiDurTime)
						}else if(res.result.toiDurTime==null){
							that.$refs.toiDurTime.innerHTML = "--"
//							console.log(that.$refs.toiDurTime)
						}
						var data = res.result
						console.log(data.toiCode)
						that.toiCode = data.toiCode
						that.toiAddTime = data.toiAddTime
						if(data.toiStatus == 1){
							that.$refs.zt.innerHTML = '已生效'
							that.$refs.cardbtn.style.display = "block"
						}else if(data.toiStatus == 2){
							that.$refs.zt.innerHTML = '已完成'
							that.$refs.toiExercisePoint1.style.display = "none"
						}else if(data.toiStatus == 3){
							that.$refs.zt.innerHTML = '已挂单'
							that.$refs.toiExercisePoint1.style.display = "none"
						}else if(data.toiStatus == 4){
							that.$refs.zt.innerHTML = '已失效'
							that.$refs.toiExercisePoint1.style.display = "none"
						}
						that.toiOptionMoney = data.toiOptionMoney
						if(data.toiProfit!=null){
							that.$refs.toiProfit.innerHTML = data.toiProfit
						}else{
							that.$refs.toiProfit.innerHTML = "--"
						}
						that.toiStockId = data.toiStockId
						that.stockName = data.stockName
						that.toiNum = data.toiNum
						that.toiBuyPoint = data.toiBuyPoint
						if(data.toiExercisePoint!=null){
							that.$refs.toiExercisePoint_1.innerHTML = data.toiExercisePoint
							that.$refs.toiExercisePoint_2.innerHTML = data.toiExercisePoint
						}else{
							that.$refs.toiExercisePoint1.style.display = "none"
							that.$refs.toiExercisePoint2.style.display = "none"
						}
						if(data.toiMethodType == 0){
							that.$refs.toiMethodType_1.innerHTML = "最新价"
						}else if(data.toiMethodType == 1){
							that.$refs.toiMethodType_1.innerHTML = "均价"
						}else if(data.toiMethodType == null){
							that.$refs.toiMethodType1.style.display = "none"
						}
						console.log(res.result)
					}else{
						alert("网络或此单异常")
					}
//					
				}
			})
		},
		methods:{
			back(){
				this.$router.push({path:'/order'})
			},
			cardbtn(){
//				console.log(this.userNumber)
				var orderId = this.$route.query.orderId
				var that = this
				ajax({
					url:''+host+'/order/exerciseOrder',
					type:'POST',
					data:JSON.stringify({
					    "userNumber": that.userNumber,
					    "orderId": orderId
					}),
					success:function(res){
						console.log(res)
						if(res.code == 101){
							alert("遇到未知错误！")
						}else if(res.code == 402){
							alert("股票不存在或已下架！")
						}else if(res.code == 403){
							alert("订单不存在或已结束！")
						}else if(res.code == 100){
							alert("行权成功!请刷新页面")
							that.$refs.cardbtn.innerHTML = '行权中...'
						}
//						console.log(this.$refs.cardbtn.innerHTML)
//						that.$refs.cardbtn.innerHTML = '行权中...'
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
	.orderdetails{
		width:100%;
		height:100%;
		background:#252528;
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
	.main .identification{
		width:100%;
		display: flex;
		flex-wrap: wrap;
		justify-content: space-around;
		border-bottom: 2px solid #2e2e32;
	}
	.main .identification li{
		flex: 1;
		height:1.2rem;
		border-left:1px solid #2e2e32;
		border-right:1px solid #2e2e32;
	}
	.main .identification li .p1{
		font-size:0.26rem;
		color:#e6e6e6;
		margin-top:0.2rem;
	}
	.main .identification li .p2{
		font-size:0.2rem;
		color:#999;
		margin-top:0.1rem;
	}
	.orderdetails .main .identification li .orderState{
		color:#FD4331;
	}
	.orderdetails .main .ordercard{
		width:7.1rem;
		height:4.6rem;
		background:#2e2e32;
		border-top-left-radius: 0.2rem;
		border-top-right-radius: 0.2rem;
		margin:0.2rem auto 0;
		color:#fff;
		display: flex;
		flex-wrap: wrap;
		font-size:0.24rem;	
	}
	.orderdetails .main .ordercard h5{
		width:100%;
		display: flex;
		flex-wrap: nowrap;
		justify-content: space-between;
		text-align: center;
	}
	.orderdetails .main .ordercard h5 span.s1{
		width:35%;
		margin-left:0.1rem;
	}
	.orderdetails .main .ordercard h5 span.s4{
		color:#FD4331;
	}
	.orderdetails .main .ordercard h5 span{
		margin-top:0.3rem;
		/*border-bottom: 2px solid #39393d;*/
	}
	.orderdetails .main .ordercard span{
		width:33.3%;
		height:0.85rem;
		text-align: center;
	}
	.orderdetails .main .ordercard span .p2{
		color:#999;
	}
	.orderdetails .main .ordercard .cardbtn{
		width:1.6rem;
		height:0.6rem;
		border:0;
		border-radius: 0.06rem;
		background:#fd4331;
		font-size:0.3rem;
		color:#fff;
		margin:0.3rem 0 0 0.5rem;
		outline: none;
		display: none;
	}
	.orderdetails .main .ordercard .p_show{
		width:100%;
		font-size:0.3rem;
		color:#fd4331;
	}
</style>