<template>
	<div class="golden">
		<h3 class="header"><span class="back" @click="back"></span>入金</h3>
		<div class="main">
			<div class="main_t">
				<p>金额<input type="text" value="" placeholder="请输入充值金额" v-model="goldNum"/></p>
			</div>
			<button class="confirm" @click="getgolde(goldNum)">确定</button>
		</div>
	</div>
</template>

<script>
	export default{
		data(){
			return{
				goldNum:''
			}
		},
		created(){
		},
		mounted(){			
		},
		methods:{
			back(){
				this.$router.push({path:'/myassets'})
			},
			getgolde(goldNum){
				if(goldNum==''){
					alert("充值金额不能为空")
				}
				console.log(goldNum)
			}
		}
	}
</script>

<style scoped>
	.golden{
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
	.main .main_t{
		margin:0.4rem 0 1.2rem;
	}
	.main .main_t p{
		font-size:0.28rem;
		color:#fff;
	}
	.main .main_t p input{
		width:3.6rem;
		height:0.66rem;
		font-size:0.24rem;
		color:#666;
		background:#252528;
		border:0;
		border:2px solid #fff;
		border-radius: 0.06rem;
		padding:0 0.2rem;
		margin-left:0.3rem;
	}
	.main .confirm{
		width:4.5rem;
		height:0.88rem;
		font-size:0.3rem;
		color:#fff;
		background:#fd4331;
		border:0;
		border-radius: 0.06rem;
	}
</style>