<template>
	<div class="order">
		<h3 class="header">订单</h3>
		<div class="operation">
			<h4 class="all" @click="allLoad">全部<img src="../assets/down.png" alt="" /></h4>
			<h4 class="sort"><img src="../assets/sort.png" alt="" /></h4>
		</div>
		<ul class="main">
			<li v-for="item in allorder">
				<div class="li_l"><p class="ordernum">订单号：{{item.toiCode}}</p><p class="needpay">买入手数：<span>{{item.toiNum}}</span></p></div>
				<div class="li_m">
					<p class="paoDate">下单日期：
						<span>{{item.toiAddTime}}</span>
					</p>
					<p class="eifDate">生效日期：
						<span :class="{'toiDurTime':item.toiDurTime=='1970-01-01'}">{{item.toiDurTime}}</span>
						<span :class="{'toiDurTime':item.toiDurTime!='1970-01-01'}">---------------</span>
					</p><p class="exerciseDate">行权日期：
						<span :class="{'toiEndTime':item.toiEndTime=='1970-01-01'}">{{item.toiEndTime}}</span>
						<span :class="{'toiEndTime':item.toiEndTime!='1970-01-01'}">---------------</span>
					</p>
				</div>
				<div class="li_r">
					<p class="state" @click="orderdetails(item.toiId)" :class="{'show':item.toiStatus == 1}">已生效</p>
					<p class="state" @click="orderdetails(item.toiId)" :class="{'show':item.toiStatus == 2}">已完成</p>
					<p class="state" @click="orderdetails(item.toiId)" :class="{'show':item.toiStatus == 3}">已挂单</p>
					<p class="state" @click="orderdetails(item.toiId)" :class="{'show':item.toiStatus == 4}">已失效</p>
				</div>
			</li>
		</ul>
		<v-footer></v-footer>
	</div>
</template>

<script>
	import vFooter from '@/components/footer_or'
	export default{
		data(){
			return{
				allorder:[],
				pages:'',
				centerId:'',
    		    userNumber:''
			}
		},
		components:{
			vFooter
		},
		created:function(){
			
		},
		mounted:function(){
			this.centerId = this.$getUrl().centerId
  			this.userNumber = this.$getUrl().userNumber
			var that =this
			ajax({
				url:''+host+'/order/getUserOrder',
				type:'POST',
				data:JSON.stringify({
				    "userNumber": that.userNumber,
				    "currentPage": 1,
				    "pageSize": 7
				}),
				success:function(res){
					for(var i=0; i<res.resultList.length;i++){
						res.resultList[i].toiAddTime = that.fmtDate(res.resultList[i].toiAddTime)
						
						res.resultList[i].toiDurTime = that.fmtDate(res.resultList[i].toiDurTime)
						
						res.resultList[i].toiEndTime = that.fmtDate(res.resultList[i].toiEndTime)
					}
				 	console.log(res.pages)
				 	that.allorder = res.resultList
				 	that.pages = res.pages
				}
			})
		},
		methods:{
			orderdetails(toiId){
//				this.$router.push({path:'/orderdetails'})
				console.log(toiId)
				var orderId = toiId
				this.$router.push({path:'/orderdetails',query:{orderId:orderId}})
			},
			fmtDate(time){
			    var date =  new Date(time);
			    var y = 1900+date.getYear();
			    var m = "0"+(date.getMonth()+1);
			    var d = "0"+date.getDate();
			    return y+"-"+m.substring(m.length-2,m.length)+"-"+d.substring(d.length-2,d.length);
			},
			allLoad(){
				console.log(this.pages)
				var pages = this.pages
				this.allorder = ""
				var that =this
				ajax({
					url:''+host+'/order/getUserOrder',
					type:'POST',
					data:JSON.stringify({
					    "userNumber": that.userNumber,
					    "currentPage": 1,
					    "pageSize": 5*pages
					}),
					success:function(res){
	//					console.log(res.resultList)
						for(var i=0; i<res.resultList.length;i++){
							res.resultList[i].toiAddTime = that.fmtDate(res.resultList[i].toiAddTime)
							
							res.resultList[i].toiDurTime = that.fmtDate(res.resultList[i].toiDurTime)

							res.resultList[i].toiEndTime = that.fmtDate(res.resultList[i].toiEndTime)
						}
					 	console.log(res.pages)
					 	that.allorder = res.resultList
					}
				})
			}
		}
	}
</script>

<style scoped>
	.order{
		width:100%;
		height:100%;
		background:#252528;
	}
	.header{
		width:100%;
		height:0.87rem;
		background:#1b1b20;
		font:0.38rem/0.87rem "";
		color:#fff;
		position: relative;
	}
	.operation{
		width: 100%;
		height:0.88rem;
		display: flex;
		flex-wrap: nowrap;
		justify-content:space-between;
		border-bottom: 2px solid #252528;
	}
	.operation h4{
		font:0.28rem/0.88rem "";
		color:#fff;
	}
	.operation .all{
		margin-left:0.3rem;
	}
	.operation .sort{
		margin-right:0.3rem;
	}
	.operation .all img{
		width:0.2rem;
		height:0.12rem;
		margin-left:0.12rem;
	}
	.operation .sort img{
		width:0.18rem;
		height:0.22rem;
		margin-left:0.12rem;
		display: none;
	}
	.main{
		width:100%;
		background:#1b1b20;
		margin-bottom: 0.89rem;
	}
	.main li{
		height:1.6rem;
		border-bottom: 2px solid #252528;
		display: flex;
		flex-wrap: nowrap;
		justify-content: space-around;
	}
	.main li div.li_l{
		width:38%
	}
	.main li div.li_m{
		width:37%;
		display: flex;
		flex-direction: column;
		justify-content: space-around;
	}
	.main li div.li_r{
		width:25%;
		position: relative;
	}
	.main li div p.ordernum{
		font-size:0.18rem;
		color:#e6e6e6;
		text-align: left;
		margin:0.4rem 0 0 0.1rem;
		width:4rem;
	}
	.main li div p.needpay{
		font-size:0.24rem;
		color:#e6e6e6;
		text-align: left;
		margin:0.2rem 0 0 0.3rem;
	}
	.main li div p.needpay span{
		font-size: 0.3rem;
		color:#fd4330;
	}
	.main li div.li_m p{
		font-size:0.24rem;
		color:#e6e6e6;
	}
	.main li div.li_m p span{
		font-size: 0.22rem;
		color:#b3b3b3;
	}
	.main li div.li_r p{
		width:1.2rem;
		height:0.54rem;
		border:1px solid #fd4331;
		border-radius: 6px;
		font-size:0.28rem;
		color:#fd4331;
		line-height: 0.5rem;
		text-align: center;
		position: absolute;
		top:0;
		left:0;
		right:0;
		bottom:0;
		margin: auto;
		display: none;
	}
	.main li div.li_r p.show{
		display: block;
	}
	.main li div.li_m .eifDate .toiDurTime{
		display: none;
	}
	.main li div.li_m .exerciseDate .toiEndTime{
		display: none;
	}
</style>