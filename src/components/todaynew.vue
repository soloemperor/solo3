<template>
	<div class="todaynew">
		<h3 class="header"><span class="back" @click="back"></span>今日要闻</h3>
		<div class="main">
			<div class="main_t">
				<h4 class="title">{{title}}</h4>
				<p class="newtime">{{newtime}}</p>
				<iframe :src="newcontent" width="" height="" class="newcontent"></iframe>
			</div>
		</div>
	</div>
</template>

<script>
	export default{
		data(){
			return{
				title:'',
				newtime:'',
				newcontent:''
			}
		},
		created:function(){
			
		},
		mounted:function(){
			console.log(this.$route.query)
			this.title = this.$route.query.title
			this.newtime = this.$route.query.time
			this.newcontent = this.$route.query.url
		},
		methods:{
			back:function(){
				this.$router.push({path:'/'})
//				console.log(this.$router.params)
			}
		}
	}
</script>

<style scoped>
	.todaynew{
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
	.main .title{
		font-size:0.3rem;
		color:#fd4331;
		margin-top:0.2rem;
	}
	.main .newtime{
		font-size:0.22rem;
		color:#b3b3b3;
		margin-top:0.14rem;
	}
	.main .newcontent{
		font:0.26rem/0.5rem "";
		color:#e6e6e6;
		padding:0 0.5rem;
		text-align: left;
		text-indent: 2em;
		border:0;
	}
</style>