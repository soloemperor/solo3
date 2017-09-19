<template>
	<div class="stocksearch">
		<h3 class="header"><span class="back" @click="back"></span>股票搜索</h3>
		<div class="main">
			<input type="text" class="search" v-model="searchVal" @input="change"/>
			<ul class="search_main">
				<li v-for="item in test">
					<p @click="getstockid(item.stockId)"><span>{{item.stockName}}</span><span>{{item.stockId}}</span></p><span class="add" @click="add(item.stockId)"></span>
			   </li>
			</ul>
		</div>
		<div class="popup" ref="popup" @click="popup">
			<div class="deleteWin">
				<h5>该股票已添加为自选</h5>
				<button class="okey" @click="okey()">确定</button>
			</div>
		</div>
	</div>
</template>

<script>
	export default{
		data(){
			return{
				searchVal: '',
				test:[],
				centerId:'',
    		    userNumber:''
			}
		},
		created:function(){
			
		},
		mounted:function(){
			this.centerId = this.$getUrl().centerId
  			this.userNumber = this.$getUrl().userNumber
//			console.log(this.$route.query)
			this.searchVal = this.$route.query.searchVal
		},
		methods:{
			back:function(){
				var router = this.$route.query.router
				if(router){
					this.$router.push({path:'/'+router+''})
				}else{
					this.$router.push({path:'/'})
				}
				
			},
			add:function(stockid){
//				console.log(stockid);
				var _this = this
				ajax({
					url:''+host+'/userStock/addUserStock',
					type:"POST",
					data:JSON.stringify({
					    "userNumber": _this.userNumber,
					    "stockId":stockid
					}),
					contentType: "application/json;charset=UTF-8",
					success:function(res){
						console.log(res);
						var code = res.code
						if(code == 100){
							alert("添加成功!")
						}else if(code == 101){
							alert("网络或账号异常！")
						}else if(code == 401){
							console.log(res)
							_this.$refs.popup.style.display = "block";
						}
					}
				});
			},
			change () {
				var _this = this.searchVal;
				var that = this;
//				console.log(_this);
				if(_this == ''){
					this.test = ""
				}else{
					ajax({
						url:''+host+'/stock/searchStock',
						type:"POST",
						data:JSON.stringify({
							'param':_this,
							'currentPage':1,
							'pageSize':10
						}),
						contentType: "application/json;charset=UTF-8",
						success:function(res){
	//						console.log(res);
						    that.test = res.resultList;
						}
					});
				}
				
				
			},
			getstockid(getId){
				var _this = this.searchVal;
				this.$router.push({path:'/gpkk',query:{stockId:getId,router:'stocksearch',searchVal:_this}})
				console.log(this.$route.query)
			},
			popup(){
				this.$refs.popup.style.display = "none";
			},
			okey(){
				this.$refs.popup.style.display = "none";
			}
		}
	}
</script>

<style scoped>
	.stocksearch{
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
	.main .search{
		width:4.6rem;
		height:0.66rem;
		border:0;
		border:2px solid #fff;
		border-radius: 6px;
		background:#252528 url(../assets/search.png) no-repeat 0.2rem center;
		background-size:0.4rem 0.38rem;
		margin:0.3rem 0;
		font:0.28rem/0.66rem "";
		color:#fff;
		padding-left:0.8rem;
	}
	.search_main{
		width:100%;
	}
	.search_main li{
		height:0.88rem;
		background:#2e2e32;
		margin-bottom:2px;
		text-align: left;
	}
	.search_main li p{
		font:0.26rem/0.88rem "";
		color:#fff;
		margin-left:0.3rem;
		display: inline;
	}
	.search_main li .add{
		width: 0.34rem;
		height:0.34rem;
		background:url(../assets/add.png) no-repeat center center;
		background-size:0.34rem 0.34rem;
		float: right;
		margin:0.3rem 0.3rem 0 0;
	}
	.stocksearch .popup{
		width:100%;
		height:100%;
		position: fixed;
		left:0;
		top:0;
		z-index: 5;
		background:rgba(0,0,0,0.6);
		display: none;
	}
	.stocksearch .popup .deleteWin{
		width:4rem;
		height:2rem;
		position: fixed;
		left:0;
		top:0;
		right:0;
		bottom:0;
		margin: auto;
		z-index: 6;
		background:#fff;
		border-radius: 0.08rem;
	}
	.stocksearch .popup .deleteWin h5{
		font:0.3rem/0.4rem "";
		color:#000;
		margin:0.3rem 0;
	}
	.stocksearch .popup .deleteWin button{
		width:1rem;
		height:0.5rem;
		border:0;
		border-radius: 0.06rem;
		margin:0.3rem 0.3rem 0;
		background:#e93030;
	}
</style>