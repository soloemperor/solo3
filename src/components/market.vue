<template>
	<div class="market">
		<h3 class="header">行情</h3>
		<input type="hidden" name="" id="" value="1" ref="inp"/>
		<div class="main">
			<div> 
				<h4 class="gpnum" >上证指数</h4>
				<ul class="gp_mar">
					<li v-for="item in arr_1" @click="getId(item.id,item.type)">
						<h5 class="li_h">{{item.name}}</h5>
						<div :class="{'green': item.differ < 0}">
							<p class="li_p">{{item.news}}</p><span class="li_s1">{{item.differ}}</span><span class="li_s2">{{item.differRange}}</span>
						</div>
					</li>
			  </ul>
			</div>
			<div>
				<h4 class="gpnum" >深证指数</h4>
				<ul class="gp_mar">
					<li v-for="item in arr_2" @click="getId(item.id,item.type)">
						<h5 class="li_h">{{item.name}}</h5>
						<div :class="{'green': item.differ < 0}">
							<p class="li_p">{{item.news}}</p><span class="li_s1">{{item.differ}}</span><span class="li_s2">{{item.differRange}}</span>
						</div>
					</li>
			  </ul>
			</div>
		</div>
		<v-footer></v-footer>
	</div>
</template>

<script>
	import vFooter from '@/components/footer_mar'
	export default{
		data(){
			return{
				arr_1:[],
				arr_2:[]
			}
		},
		components:{
			vFooter
		},
		created:function(){
		},
		mounted:function(){
			var inphidden = this.$refs.inp.value;
			var _this = this;
			ajax({
				url:''+host+'/index/list',
				type:'POST',
				success:function(info){
//					console.log(res.resultList)
					for(var i=0;i<info.resultList.length;i++){
//						console.log(res.resultList[i].type);
						var arrType = info.resultList[i].type;
						if(arrType == 1){
							_this.arr_1.push(info.resultList[i]);
						}else if(arrType == 2){
							_this.arr_2.push(info.resultList[i]);
						}
					}
					var time1 = window.setInterval(function(){
						_this.arr_1 = []
						_this.arr_2 = []
						_this.loadData()
//						console.log(1)
					},3000)
				}
			})
			let sw = true;
			window.addEventListener('scroll',function(){  
                // console.log(document.documentElement.clientHeight+'-----------'+window.innerHeight); // 可视区域高度  
//                 console.log(document.body.scrollTop); // 滚动高度  
//                 console.log(document.body.offsetHeight); // 文档高度  
                // 判断是否滚动到底部  
                if(document.body.scrollTop + window.innerHeight >= document.body.offsetHeight) {  
                    // console.log(sw);  
                    // 如果开关打开则加载数据  
                    if(sw==true){  
                        // 将开关关闭  
                        sw = false;  
                    }  
                }  
           })
		},
		methods:{
			getId(id,type){
				console.log(id)
				console.log(type)
				this.$router.push({path:'/indexkk',query:{id:id,type:type}})
				console.log(this.$route.query)
			},
			loadData(){
				var _this = this;
				ajax({
					url:''+host+'/index/list',
					type:'POST',
					success:function(info){
	//					console.log(res.resultList)
						for(var i=0;i<info.resultList.length;i++){
	//						console.log(res.resultList[i].type);
							var arrType = info.resultList[i].type;
							if(arrType == 1){
								_this.arr_1.push(info.resultList[i]);
							}else if(arrType == 2){
								_this.arr_2.push(info.resultList[i]);
							}
						}
					}
				})
			}
		}
	}
</script>

<style scoped>
	.market{
		width:100%;
		height:100%;
		background:#252528;
	}
	.header{
		width:100%;
		height:0.87rem;
		background:#1b1b20;
		font:0.38rem/0.87rem "";
		color:#fff;
		position: relative;
	}
	.main{
		margin-bottom:0.98rem;
		background:#252528;
		overflow: auto;
	}
	.gpnum{
		height:0.88rem;
		font:0.28rem/0.88rem "";
		color:#fff;
		text-align: left;
		padding-left:0.3rem;
	}
	.gp_mar{
		width:100%;
		display: flex;
		flex-wrap: wrap;
		flex-direction:inherit;
		justify-content: flex-start;
		border:1px solid #2e2e32;
	}
	.gp_mar li{
		width:33.3%;
		height:1.6rem;
		border:1px solid #2e2e32;
	}
	.gp_mar li{
		font-size:0.28rem;
		color:#e6e6e6;
	}
	.gp_mar li div{
		font:0.28rem/0.4rem "";
		color:#d52424;
	}
	.gp_mar li .green{
		color: #090;
	}
	.gp_mar li span{
		font-size:0.2rem;
	}
	.gp_mar li .li_h{
		font-size:0.28rem;
		margin-top:0.3rem;
	}
	.gp_mar li .li_s1{
		margin-right:0.1rem;
	}
	/*.gp_mar li:nth-child(1) p,li:nth-child(1) span{
		color:#090;
	}
	.gp_mar li:nth-child(2) p,li:nth-child(2) span{
		color:#090;
	}
	.gp_mar li:nth-child(5) p,li:nth-child(5) span{
		color:#090;
	}*/
</style>