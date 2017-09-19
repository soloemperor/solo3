<template>
	<div class="addbank">
		<h3 class="header"><span class="back" @click="back"></span>添加银行卡</h3>
		<div class="main">
			<h5 class="tishi">请绑定持卡人银行卡</h5>
			<ul class="inputArea">
				<li class="li_1">
					<p class="cardname">持卡人
						<input type="text" class="inpname" value="" placeholder="杨丹"/>
					</p>
				</li>
				<li class="li_2">
					<p class="cardnum">卡号
						<input type="text" class="inpnum" value="" placeholder="无需网银/免手续费"/>
					</p>
				</li>
				<li class="li_3">
					<p class="cardphone">预留手机号
						<input type="" class="inpphone" value="" placeholder="17767111365" v-model="phnonenum"/><button class="getyz" @click="getyz(phnonenum)">发送验证码</button>
					</p>
				</li>
				<li class="li_4">
					<p class="setyz">填写验证码
						<input type="" class="inpyz" value="" />
					</p>
				</li>
			</ul>
			<button class="complete" @click="complete">完成</button>
		</div>
	</div>
</template>

<script>
	export default{
		data(){
			return{
				phnonenum:''
			}
		},
		mounted:function(){
			
		},
		methods:{
			back:function(){
				this.$router.push({path:'/mybank'})
			},
			getyz(phnonenum){
				console.log(phnonenum)
			},
			complete(){
				console.log('ok')
			}
		}
	}
</script>

<style scoped>
	.addbank{
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
	.main .tishi{
		height:0.8rem;
		font:0.24rem/0.8rem "";
		color:#999;
		text-align: left;
		margin-left:0.3rem;
	}
	.main .inputArea{
		width:100%;
	}
	.main .inputArea li{
		background:#2e2e32;
		height:0.88rem;
	}
	.main .inputArea li p{
		font:0.28rem/0.88rem "";
		color:#fff;
		text-align: left;
		margin-left:0.3rem;
	}
	.main .inputArea li p input{
		background:#2E2E32;
		border:0;
		font:0.24rem/0.88rem "";
		color:#e0e0e0;
		padding: 0 0.3rem;
	}
	.main .inputArea .li_1 p input{
		margin-left:0.55rem;
	}
	.main .inputArea .li_2{
		margin-top:1px;
	}
	.main .inputArea .li_2 p input{
		margin-left:0.84rem;
	}
	.main .inputArea .li_3 p button{
		width:1.6rem;
		height:0.54rem;
		border:0;
		border-radius: 0.06rem;
		outline: none;
		font-size:0.26rem;
		color:#fff;
		background:#e93030;
		line-height: 0.54rem;
		float:right;
		margin:0.2rem 0.3rem 0 0;
	}
	.main .inputArea .li_3{
		margin-top:0.1rem;
	}
	.main .inputArea .li_4{
		margin-top:1px;
	}
	.main .complete{
		width:4.5rem;
		height:0.88rem;
		font-size:0.3rem;
		color:#fff;
		border:0;
		border-radius: 0.06rem;
		outline: none;
		background:#e93030;
		margin-top:0.8rem;
	}
</style>