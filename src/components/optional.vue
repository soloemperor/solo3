<template>
	<div class="optional">
		<h3 class="header">自选<span class="add" @click="add"></span></h3>
		<div class="main">
			<div>股票名称</div>
			<div>最新</div>
			<div>涨幅</div>
			<div>涨跌</div>
			<div>类型</div>
			<div>成交量</div>
			<!--<div>更新时间</div>-->
		</div>
		<ul class="situation">
			<li v-for="item in optional" @longtap="handleTap(item.stockId)" @click="getstockid(item.stockId)">
				<p @longtap="handleTap(item.stockId)" class="gp_name">{{item.stockName}}<span @longtap="handleTap(item.stockId)" class="code">{{item.stockId}}</span></p>
				<span @longtap="handleTap(item.stockId)" class="latest" :class="{'green':item.differ < 0}">{{item.now}}</span>
				<span @longtap="handleTap(item.stockId)" class="rise" :class="{'green':item.differ < 0}">{{item.differRange}}</span>
				<span @longtap="handleTap(item.stockId)" class="fall" :class="{'green':item.differ < 0}">{{item.differ}}</span>
				<span @longtap="handleTap(item.stockId)" class="cls" :class="{'show':item.type == 1}">SH</span>
				<span @longtap="handleTap(item.stockId)" class="cls" :class="{'show':item.type == 2}">SZ</span>
				<span @longtap="handleTap(item.stockId)" class="cjl" :class="{'green':item.differ < 0}">{{item.volume}}</span>
				<!--<span @longtap="handleTap(item.stockId)" class="lastUpdateTime" :class="{'green':item.differ < 0}">{{item.lastUpdateTime}}</span>-->
			</li>
		</ul>
		<v-footer></v-footer>
		<div class="popup" ref="popup" @click="popup">
			<div class="deleteWin">
				<h5>是否删除该自选股？</h5>
				<button class="cancel" @click="cancel">取消</button><button class="okey" @click="okey()">确定</button>
			</div>
		</div>
	</div>
</template>

<script>
	import vFooter from '@/components/footer_op'
	export default {
	    name: 'optional',
	    data () {
	    	return {
		    	optional:[],
		    	delId:'',
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
			this.loadData()
			var _this = this;
			var currentPage = 1;
			let sw = true;
			window.addEventListener('scroll',function(){  
//                 console.log(document.documentElement.clientHeight+'-----------'+window.innerHeight); // 可视区域高度  
//                 console.log('t'+document.body.scrollTop); // 滚动高度  
//                 console.log('h'+document.body.offsetHeight); // 文档高度  
                // 判断是否滚动到底部 
//              var currentPage = 1;
                if(document.body.scrollTop + window.innerHeight >= document.body.offsetHeight) {  
//                     console.log(sw);  
                    // 如果开关打开则加载数据  
                    if(sw==true){  
                        // 将开关关闭  
                        sw = false;  
                        currentPage++;
                        
//                      console.log(currentPage)
						ajax({
							url:''+host+'/userStock/userStockTable',
							type:'POST',
							data:JSON.stringify({
								    "userNumber": _this.userNumber,
								    "currentPage": currentPage,
								    "pageSize": 10
							}),
							success:function(res){
//								console.log(res.resultList.length)
								if(res.resultList.length>0){
									for(var i=0; i<res.resultList.length;i++){
										res.resultList[i].lastUpdateTime = _this.fmtDate(res.resultList[i].lastUpdateTime)
										_this.optional.push(res.resultList[i])
									}
									sw=true
								}else{
									sw=true
								}
							}
						})
                    }  
                }  
            })
	  	},
	  	methods:{
		  	add:function(){
		  		console.log("add")
		  		this.$router.push({path:'/stocksearch',query:{router:'optional'}})
		  	},
		  	handleTap(stockid){
				this.delId = stockid
		  		this.$refs.popup.style.display = "block";
		  	},
		  	cancel(){
		  		this.$refs.popup.style.display = "none";
		  	},
		  	popup(){
		  		this.$refs.popup.style.display = "none";
		  	},
		  	okey(){
		  		var that = this;
		  		ajax({
		  			url:''+host+'/userStock/delUserStock',
		  			type:'POST',
		  			data:JSON.stringify({
					    "userNumber": that.userNumber,
					    "stockId": that.delId
					}),
					success:function(res){
//						console.log(res);
						that.optional = that.optional.filter(x => x.stockId !== that.delId)
						that.delId = ''
						console.log(that.optional);
					}
		  		})
		  	},
		  	loadData(){
		  		var _this = this;
				ajax({
					url:''+host+'/userStock/userStockTable',
					type:'POST',
					data:JSON.stringify({
						    "userNumber": _this.userNumber,
						    "currentPage": 1,
						    "pageSize": 10
					}),
					success:function(res){
//						console.log(res)
						for(var i=0; i<res.resultList.length;i++){
							res.resultList[i].lastUpdateTime = _this.fmtDate(res.resultList[i].lastUpdateTime)
							_this.optional.push(res.resultList[i])
						}
					}
				})
		    },
	  		getstockid(stockId){
//	  			console.log(stockId)
				this.$router.push({path:'/gpkk',query:{stockId:stockId,router:'optional'}})
//				console.log(this.$route.query.router)
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
	.optional{
		width:100%;
		height:100%;
		background:#252528;
		position: relative;
	}
	.header{
		width:100%;
		height:0.87rem;
		background:#1b1b20;
		font:0.38rem/0.87rem "";
		color:#fff;
		position: relative;
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
		margin-top:0.2rem;
	}
	.main div{
		flex: 1;
		background:#3d3d3e;
		font:0.24rem/0.8rem "";
		color:#dbdbdb;
		border-right: 1px solid #808080;
	}
	.main div:nth-child(7){
		border-right: 0;
	}
	.situation{
		width:100%;
		background:#252528;
		padding-bottom: 2.88rem;
		overflow: auto;
	}
	.situation li{
		height:0.88rem;
		border-bottom: 2px solid #2e2e32;
		display: flex;
		flex-wrap: nowrap;
		justify-content: space-around;
	}
	.situation li p{
		flex: 1;
		font-size:0.24rem;
		color:#e6e6e6;
		margin-top:0.1rem;
	}
	.situation li .latest,.rise,.fall,.show,.cjl,.lastUpdateTime{
		flex: 1;
		font:0.2rem/0.88rem "";
		color:#d52424;
		
	}
	.situation li .cls{
		display: none;
	}
	.situation li .show{
		display: block;
		font:0.2rem/0.88rem "";
		color:#e6e6e6;
	}
	.situation li p span.code{
		display: block;
		font-size: 0.2rem;
		color:#999;
	}
	.optional .situation li .green{
		color:#090;
	}
	.optional .popup{
		width:100%;
		height:100%;
		position: fixed;
		left:0;
		top:0;
		z-index: 5;
		background:rgba(0,0,0,0.6);
		display: none;
	}
	.optional .popup .deleteWin{
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
	.optional .popup .deleteWin h5{
		font:0.3rem/0.4rem "";
		color:#000;
		margin:0.3rem 0;
	}
	.optional .popup .deleteWin button{
		width:1rem;
		height:0.5rem;
		border:0;
		border-radius: 0.06rem;
		margin:0.3rem 0.3rem 0;
	}
	.optional .popup .deleteWin button.cancel{
		background:#4691ee;
	}
	.optional .popup .deleteWin button.okey{
		background:#e93030;
	}
</style>