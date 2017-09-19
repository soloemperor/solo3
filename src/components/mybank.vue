<template>
	<div class="mybank">
		<h3 class="header"><span class="back" @click="back"></span>我的银行卡<span class="add" @click="add"></span></h3>
		<div class="main">
			<ul class="bankli">
				<li>
					<div class="bankpic"><img src="../assets/ka_w.png"/></div>
					<div class="infor">
						<p class="bankname">{{bankname}}</p>
						<p class="bankclass">{{bankclass}}</p>
						<p class="banknum">{{banknum}}</p>
					</div>
					<div class="cancel"><button class="cancelbank">删除</button></div>
				</li>
				<li>
					<div class="bankpic"><img src="../assets/ka_w.png"/></div>
					<div class="infor">
						<p class="bankname">{{bankname}}</p>
						<p class="bankclass">{{bankclass}}</p>
						<p class="banknum">{{banknum}}</p>
					</div>
					<div class="cancel"><button class="cancelbank">删除</button></div>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
	export default{
		data(){
			return{
				bankname:'中国建设银行',
				bankclass:'储蓄卡',
				banknum:'**** **** **** 7084'
			}
		},
		mounted:function(){
			
		},
		methods:{
			back:function(){
				this.$router.push({path:'/mycenter'})
			},
			add:function(){
				this.$router.push({path:'/addbank'})
			}
		}
	}
</script>

<style scoped>
	.mybank{
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
	.header .add{
		width: 0.38rem;
		height:0.38rem;
		background:url(../assets/add.png) no-repeat center center;
		background-size:0.38rem 0.38rem;
		position: absolute;
		right:0.3rem;
		top:0.3rem;
	}
	.main{
		width:100%;
		height:0.8rem;
		display: flex;
		flex-wrap: nowrap;
		justify-content: space-around;
	}
	.main .bankli{
		width:100%
	}
	.main .bankli li{
		height:1.5rem;
		background:#2e2e32;
		margin-top:0.1rem;
		display: flex;
		flex-wrap: nowrap;
		justify-content: space-around;
	}
	.main .bankli li .bankpic{
		width:20%;
		position: relative;
	}
	.main .bankli li .infor{
		width:50%;
		text-align: left;
	}
	.main .bankli li .cancel{
		width:30%;
		position: relative;
	}
	.main .bankli li .bankpic img{
		width:1rem;
		height:0.58rem;
		position: absolute;
		top:0;
		left:0.3rem;
		right:0;
		bottom:0;
		margin: auto;
	}
	.main .bankli li .infor p{
		margin-left:0.3rem;
	}
	.main .bankli li .infor .bankname{
		font:0.26rem/0.5rem "";
		color:#fff;
	}
	.main .bankli li .infor .bankclass{
		font:0.24rem/0.5rem "";
		color:#2c3e60;
	}
	.main .bankli li .infor .banknum{
		font:0.26rem/0.5rem "";
		color:#999;
	}
	.main .bankli li .cancel .cancelbank{
		width:1rem;
		height:0.5rem;
		border:0;
		outline: none;
		background:#2e2e32;
		border:1px solid #FD4331;
		font-size:0.26rem;
		color:#FD4331;
		border-radius: 0.25rem;
		position: absolute;
		top:0;
		left:0.3rem;
		right:0;
		bottom:0;
		margin: auto;
	}
</style>