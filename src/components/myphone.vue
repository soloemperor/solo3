<template>
	<div class="myphone">
		<h3 class="header"><span class="back" @click="back"></span>绑定手机号</h3>
		<div class="main">
			<ul class="binding">
				<li class="phonenum">
					<input type="text" name="" class="valNum" placeholder="请输入手机号" v-model="valNum"/>
					<button class="getcode" @click="getcode(valNum)" ref="getcode">获取验证码</button>
				</li>
				<li class="phonecode">
					<input type="text" name="" class="codeNum" placeholder="请输入验证码" v-model="codeNum"/>
				</li>
			</ul>
			<button class="determine" @click="determine(valNum,codeNum)">确定</button>
		</div>
		<div class="popup" ref="popup">
			<div class="win" ref="win1">
				<p>验证码已发送，</p>
				<p>请注意接收。</p>
			</div>
			<div class="win" ref="win2">
				<p>请输入正确手机号！</p>
			</div>
		</div>
	</div>
</template>

<script>
	export default{
		data(){
			return{
				valNum:'',
				codeNum:''
			}
		},
		mounted(){
			
		},
		methods:{
			back(){
				this.$router.push({path:'/mycenter'})
			},
			getcode(valNum){//手机号验证
//				console.log(valNum);
				this.nowphone = valNum
				var pattern = /0?(13|14|15|17|18)[0-9]{9}/;
				var isphone = pattern.test(valNum)
				if(isphone){
					this.$refs.popup.style.display = "block"
					this.$refs.win1.style.display = "block"
					var that = this
					var wintime = window.setTimeout(function(){
						that.$refs.popup.style.display = "none"
						that.$refs.win1.style.display = "none"
					},1500)
					var time = 10
					var codetime = window.setInterval(function(){
						time--
						if(time == 0){
							window.clearTimeout(wintime)
							window.clearInterval(codetime)
							that.$refs.getcode.innerHTML = "获取验证码"
						}else{
							that.$refs.getcode.innerHTML = time
						}
					},1000)
				}else{
//					console.log("请输入正确手机号！")
					this.$refs.popup.style.display = "block"
					this.$refs.win2.style.display = "block"
					var that = this
					var wintime = window.setTimeout(function(){
						that.$refs.popup.style.display = "none"
						that.$refs.win2.style.display = "none"
					},1500)
				}
			},
			determine(phone,code){
				
			}
		}
	}
</script>

<style scoped>
	.myphone{
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
    .main .binding{
		width:100%;
		margin:0.1rem 0 1.2rem;
	}
	.main .binding li{
		height:0.88rem;
		background:#2e2e32;
		margin-bottom: 2px;
		text-align: left;
	}
	.main .binding li .valNum{
		height:0.88rem;
		background:#2e2e32;
		padding-left:0.3rem;
		font-size:0.26rem;
		color:#999;
	}
	.main .binding li .getcode{
		width:1.8rem;
		height:0.6rem;
		border:0;
		outline: none;
		border-radius: 0.06rem;
		background:#fd4331;
		font-size:0.28rem;
		color:#fff;
		float: right;
		margin:0.15rem 0.3rem 0 0;
	}
	.main .binding li .codeNum{
		width:100%;
		height:100%;
		background:#2e2e32;
		padding-left:0.3rem;
		font-size:0.26rem;
		color:#999;
	}
	.main .determine{
		width:5.4rem;
		height:0.88rem;
		font-size:0.3rem;
		color:#fff;
		background:#fd4331;
		border:0;
		border-radius: 0.06rem;
	}
	.popup{
		width:100%;
		height:100%;
		position: absolute;
		left:0;
		top:0;
		background: rgba(0,0,0,0.3);
		display: none;
	}
	.win{
		width:3.5rem;
		height:2rem;
		position: absolute;
		left:0;
		top:0;
		right:0;
		bottom:0;
		margin:auto;
		background: #fff;
		border-radius: 0.1rem;
		font:600 0.3rem/0.5rem "";
		color:#000;
		display: none;
	}
	.win p{
		margin-top:0.3rem
	}
</style>