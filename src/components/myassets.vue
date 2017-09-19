<template>
	<div class="myassets">
		<h3 class="header"><span class="back" @click="back"></span>我的资产<span class="assets_bd" @click="breakdownassets">资产明细</span></h3>
		<div class="main">
			<ul class="assetsDetails">
				<li><h4>总资产</h4><p>{{balance}}</p></li>
				<li><h4>总收益</h4><p>{{profit}}</p></li>
				<li><h4>本月收益</h4><p>{{mProfit}}</p></li>
			</ul>
			<button class="golden" @click="golden">入金</button><button class="gold" @click="gold">出金</button>
		</div>
	</div>
</template>

<script>
	export default{
		data(){
			return{
				balance:'',
				profit:'',
				mProfit:'',
				centerId:'',
    		    userNumber:''
			}
		},
		mounted(){
			this.centerId = this.$getUrl().centerId
  			this.userNumber = this.$getUrl().userNumber
			var that = this 
			ajax({
				url:''+host+'/order/userWallet',
				type:'POST',
				data:JSON.stringify({
				    "userNumber": that.userNumber
				}),
				success:function(res){
					console.log(res)
					that.balance = res.result.balance
					that.profit = res.result.profit
					that.mProfit = res.result.mProfit
				}
			})
		},
		methods:{
			back(){
				this.$router.push({path: '/mycenter'})
			},
			breakdownassets(){
				this.$router.push({path: '/breakdownassets'})
			},
			golden(){
				this.$router.push({path: '/golden'})
			},
			gold(){
				this.$router.push({path: '/gold'})
			}
		}
	}
</script>

<style scoped>
	.myassets{
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
	.header .assets_bd{
		font-size:0.3rem;
		color:#fff;
		position: absolute;
		top:0.1rem;
		right:0.3rem;
	}
	.myassets .main{
		width:100%;
		height:100%;
		background:#252528;
	}
	.myassets .main .assetsDetails{
		width:100%;
		display: flex;
		flex-wrap: nowrap;
		justify-content: space-around;
		padding:0.1rem 0.3rem 1.6rem;
	}
	.myassets .main .assetsDetails li{
		width:2.28rem;
		height:1.80rem;
		background:#2E2E32;
	}
	.myassets .main .assetsDetails li h4{
		font-size:0.28rem;
		color:#fff;
		margin-top:0.55rem;
	}
	.myassets .main .assetsDetails li p{
		font-size:0.28rem;
		color:#FD4331;
	}
	.myassets .main button{
		width:2.6rem;
		height:0.88rem;
		font-size:0.3rem;
		color:#fff;
		border:0;
		border-radius: 6px;
		outline: none;
	}
	.myassets .main .golden{
		background:#fd4331;
		margin-right:0.15rem;
	}
	.myassets .main .gold{
		background:#666;
		margin-left:0.15
	}
</style>