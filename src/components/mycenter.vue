<template>
	<div class="mycenter">
		<h3 class="header"><span class="back" @click="back"></span>个人中心</h3>
		<div class="main_my">
			<div class="headPortrait"><img :src="tuiHeadImg" alt="" /></div>
			<p class="nickname">{{tuiNickName}}</p>
			<ul class="mydata">
				<li class="my_asset" @click="myassets"><p>我的资产<span class="asset_open"></span></p></li>
				<li class="my_phone" @click="myphone"><p>绑定手机号<span class="phone_open"></span></p></li>
				<li class="my_bank" @click="mybank"><p>我的银行卡<span class="bank_open"></span></p></li>
			</ul>
		</div>	
	</div>
</template>

<script>
	export default{
		data(){
			return{
				centerId:'',
    		    userNumber:'',
    		    tuiHeadImg:'',
    		    tuiNickName:''
			}
		},
		created(){
		},
		mounted(){
			this.centerId = this.$getUrl().centerId
  			this.userNumber = this.$getUrl().userNumber
  			var that = this
			ajax({
				url:''+host+'/order/getUserInfo',
				type:'POST',
				data:JSON.stringify({
				    "userNumber": that.userNumber
				}),
				success:function(res){
					console.log(res)
					that.tuiHeadImg = res.data.tuiHeadImg
					that.tuiNickName = res.data.tuiNickName
				}
			})
		},
		methods:{
			back(){
				this.$router.push({path:'/'})
			},
			myassets(){
				this.$router.push({path:'/myassets'})
			},
			myphone(){
				this.$router.push({path:'/myphone'})
			},
			mybank(){
				this.$router.push({path:'/mybank'})
			}
		}
	}
</script>

<style scoped>
	.mycenter{
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
	.mycenter .main_my .headPortrait{
		width:1.6rem;
		height:1.6rem;
		border:2px solid #fff;
		border-radius: 50%;
		margin:0.6rem auto 0.2rem;
	}
	.mycenter .main_my .headPortrait img{
		width:100%;
		height:100%;
		border-radius: 50%;
	}
	.mycenter .main_my .nickname{
		font-size:0.3rem;
		color:#fff;
		margin-bottom: 1rem;
	}
	.mycenter .main_my .mydata{
		width:100%;
	}
	.mycenter .main_my .mydata li{
		height:0.88rem;
		margin-bottom: 2px;
		text-align: left;
	}
	.mycenter .main_my .mydata .my_asset{
		background:#2e2e32 url(../assets/asset.png) no-repeat 0.3rem center;
		background-size:0.38rem 0.38rem;
	}
	.mycenter .main_my .mydata .my_phone{
		background:#2e2e32 url(../assets/phone.png) no-repeat 0.35rem center;
		background-size:0.3rem 0.4rem;
	}
	.mycenter .main_my .mydata .my_bank{
		background:#2e2e32 url(../assets/bank.png) no-repeat 0.3rem center;
		background-size:0.38rem 0.26rem;
	}
	.mycenter .main_my .mydata .my_asset p{
		font:0.28rem/0.88rem "";
		color:#fff;
		margin-left:0.88rem;
	}
	.mycenter .main_my .mydata .my_phone p{
		font:0.28rem/0.88rem "";
		color:#fff;
		margin-left:0.9rem;
	}
	.mycenter .main_my .mydata .my_bank p{
		font:0.28rem/0.88rem "";
		color:#fff;
		margin-left:0.88rem;
	}
	.mycenter .main_my .mydata li p span{
		width:0.16rem;
		height:0.26rem;
		background:url(../assets/right.png) no-repeat center center;
		background-size:0.16rem 0.26rem;
		float:right;
		margin:0.3rem 0.3rem 0 0;
	}
</style>