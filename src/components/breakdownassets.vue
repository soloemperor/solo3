<template>
	<div class="breakdownassets">
		<h3 class="header"><span class="back" @click="back"></span>资产明细<span class="all" @click="allLoad">全部<img src="../assets/down.png" alt="" /></span></h3>
		<div class="main">
			<ul class="eachgp">
				<li v-for="item in arr">
					<div class="li_l">
						<p class="p1" :class="{'pp':item.tsaType == 1}">充值</p>
						<p class="p1" :class="{'pp':item.tsaType == 2}">提现</p>
						<p class="p1" :class="{'pp':item.tsaType == 3}">下单:{{item.tsaChargeCode}}</p>
						<p class="p1" :class="{'pp':item.tsaType == 4}">收益</p>
						<p class="p1" :class="{'pp':item.tsaType == 5}">提成</p>
						<p class="p1" :class="{'pp':item.tsaType == 6}">提现失败</p>
						<p class="p1" :class="{'pp':item.tsaType == 7}">挂单失效退还权利金:{{item.tsaChargeCode}}</p>
						<p class="gptime p2">{{item.tsaAddTime}}</p>
					</div>
					<div class="li_r" :class="{'green':item.tsaMoney < 0}">
						<p class="gpNum">{{item.tsaMoney}}</p>
					</div>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
	export default{
		data(){
			return{
				arr:[],
				pages:'',
				centerId:'',
    		    userNumber:''
			}
		},
		mounted(){
			this.centerId = this.$getUrl().centerId
  			this.userNumber = this.$getUrl().userNumber
			var that = this
			ajax({
				url:''+host+'/order/userWalletAccount',
				type:'POST',
				data:JSON.stringify({
				    "userNumber": that.userNumber,
				    "currentPage": 1,
				    "pageSize": 7
				}),
				success:function(res){
					console.log(res)
					for(var i=0; i<res.resultList.length;i++){
						res.resultList[i].tsaAddTime = that.fmtDate(res.resultList[i].tsaAddTime)
					}
					that.arr = res.resultList
					that.pages = res.pages
				}
			})
		},
		methods:{
			back(){
				this.$router.push({path:'/myassets'})
			},
			allLoad(){
				var pages = this.pages
				this.arr = ""
				var that = this
				ajax({
					url:''+host+'/order/userWalletAccount',
					type:'POST',
					data:JSON.stringify({
					    "userNumber": "15c0c5a35bb6cc672ee29cd4fe363786",
					    "currentPage": 1,
					    "pageSize": 5*pages
					}),
					success:function(res){
						console.log(res)
						for(var i=0; i<res.resultList.length;i++){
							res.resultList[i].tsaAddTime = that.fmtDate(res.resultList[i].tsaAddTime)
						}
						that.arr = res.resultList
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
	.breakdownassets{
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
	.header .all{
		font-size:0.3rem;
		color:#fff;
		position: absolute;
		top:0.1rem;
		right:0.3rem;
	}
	.header .all img{
		width:0.2rem;
		height:0.12rem;
		margin-left:0.12rem;
	}
	.main{
		width:100%;
		height:100%;
		background:#252528;
	}
	.main .eachgp{
		width:100%
	}
	.main .eachgp li{
		height:1rem;
		background:#252528;
		border-bottom: 2px solid #2e2e32;;
		display: flex;
		flex-wrap: nowrap;
		justify-content: space-around;
	}
	.main .eachgp li .li_l{
		width:70%;
		text-align: left;
	}
	.main .eachgp li .li_l p{
		margin-left:0.3rem;
	}
	.main .eachgp li .li_l .p1{
		font-size:0.26rem;
		color:#e6e6e6;
		margin-top:0.2rem;
		display: none;
	}
	.main .eachgp li .li_l .pp{
		display: block;
	}
	.main .eachgp li .li_l .p2{
		font-size:0.2rem;
		color:#999;
	}
    .eachgp li .li_r{
		width:30%;
		font-size: 0.3rem;
		color:#D52424;
	}
	.eachgp li .gpNum{
		text-align: right;
		margin:0.3rem 0.3rem 0 0;
	}
	.breakdownassets .main .eachgp li .green{
		width:30%;
		font-size: 0.3rem;
		color: #090;
	}
</style>