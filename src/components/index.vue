<template>
  <div class="index">
  	<!--iview轮播-->
  	<div id="j-carousel">
  		<ul class="j-page">
  			<li v-for="(x, i) in pathArr" :class="{'active': target == i}"></li>
  		</ul>
  		<Carousel autoplay @on-change="handleChange" dots="none">
        <CarouselItem v-for="item in pathArr" :key="item.bannerId">
        		<img :src="item.img" alt=""/>
        </CarouselItem>
      </Carousel>
  	</div>
	  <div class="search" @click="stocksearch"><p>代码/拼音/首字母</p></div>
	  <div class="myself" @click="myself"></div>
	  <ul class="more">
	  	<li></li>
	  	<li></li>
	  	<li></li>
	  </ul>
	  <h3 class="new"><span class="new_1">今日要闻</span><span class="new_open"></span></h3>
	  <ul class="todaynew">
	  	<li class="n_1" @click="New(item.url,item.title,item.createTime)" v-for="item in newArr"><p>{{item.title}}</p></li>
	  </ul>
	  <!--<input type="text" name="" id="" value="" v-model="msg" style="height:2rem;"/>-->
		<!--<child :inputValue="msg"></child>-->
	  <v-footer></v-footer>
  </div>
</template>

<script>
import vFooter from '@/components/footer'
export default {
		name: 'index',
  	data () {
    	  return {
    		    pathArr: [],
    		    target: 0,
    		    newArr:[],
    		    pages:'',
    		    centerId:'',
    		    userNumber:''
    	  }
  	},
  	components:{
  			vFooter
  	},
  	mounted:function(){
//			console.log(this.$getUrl())
  			this.centerId = this.$getUrl().centerId
  			this.userNumber = this.$getUrl().userNumber
//			this.pathArr = [{path: '../../static/img/banner_1.png'},
//  		{path: '../../static/img/banner_2.png'},{path: '../../static/img/banner_1.png'}]
	  		var that = this
	  		ajax({
	  	  		url:''+host+'/system/banner/getBannerList',
	  	  		type:'POST',
	  				data:JSON.stringify({
    						"currentPage" : 1 ,
    						"pageSize" : 10
						}),
						success:function(res){
								console.log(res)
								that.pathArr = res.obj
						}
	 			})
  			ajax({
  				  url:''+host+'/main/getNewsTable',
  				  type:'POST',
  				  data:JSON.stringify({
                "currentPage" : 1,
                "pageSize" : 10
            }),
            success:function(res){
            		console.log(res)
            		for(var i=0;i<res.resultList.length;i++){
            				res.resultList[i].createTime = that.fmtDate(res.resultList[i].createTime)
            		}
            		that.newArr = res.resultList
            }
  			})
  	},
 		methods:{
  			handleChange (x, y) {
  					this.target = y
//					console.log(x)
//					console.log(y)
  			},
  			stocksearch:function(){
  					this.$router.push({path:'/stocksearch'})
  			},
  			New:function(url,title,time){
  					console.log(url,title,time)
						this.$router.push({path:'/todaynew',query:{url:url,title:title,time:time}})
//					console.log(this.$route.query.url) 
//			    console.log(this.$router)
//					console.log(this.$router)
//					let type = x.type	
  			},
  			myself(){
  					this.$router.push({path:'/mycenter'})
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#j-carousel {
	position: relative;
}
#j-carousel img{
	width:100%;
	height:100%;
}
.j-page {
		width: 100%;
		position: absolute;
		z-index: 3;
		bottom: 0;
	}
.j-page li{
	display: inline-block;
	text-align: center;
	vertical-align: middle;
	width: 0.12rem;
	height: 0.12rem;
	background: #ccc;
	border-radius: 50%;
	margin:0 0.1rem;
}
.j-page .active{
	background: #d52424;
}
.index{
	width:100%;
	height: 100%;
	background:#252528;
	overflow:auto;
}
.search{
	width:4.6rem;
	height:0.64rem;
	position: absolute;
	top:0.5rem;
	left:0;
	right:0;
	bottom:0;
	margin:0 auto;
	z-index: 3;
	background:rgba(0,0,0,0.6) url(../assets/search.png) no-repeat 0.3rem center;
	background-size:0.42rem 0.42rem;
	border-radius: 0.4rem;	
}
.search p{
	font:0.24rem/0.64rem "";
	color:#ccc;
	text-align: left;
	margin-left:1rem;
}
.myself{
	width:0.35rem;
	height:0.4rem;
	background:url(../assets/myself.png) no-repeat center center;
	background-size:0.35rem 0.4rem;
	position: absolute;
	top:0.6rem;
	right:0.5rem;
	z-index: 3;
}
.more{
	width:100%;
	display: flex;
	flex-wrap: nowrap;
	justify-content: space-around;
	background:#252528;
	border-bottom: 2px solid #2e2e32;
}
.more li{
	flex: 1;
	height:2.6rem;
}
.more li:nth-child(1){
	background:url(../assets/show.png) no-repeat center center;
	background-size:1.2rem 1.65rem;
}
.more li:nth-child(2){
	background:url(../assets/guide.png) no-repeat center center;
	background-size:1.2rem 1.65rem;
}
.more li:nth-child(3){
	background:url(../assets/trade.png) no-repeat center center;
	background-size:1.2rem 1.65rem;
}
.new{
	width:100%;
	height:0.88rem;
	background:#252528;
	text-align: left;
	border-bottom: 2px solid #2e2e32;
}
.new .new_1{
	font:0.3rem/0.88rem "";
	color:#fff;
	margin-left:0.3rem;
}
.new .new_open{
	width:0.16rem;
	height:0.26rem;
	background:url(../assets/right.png) no-repeat center center;
	background-size:0.16rem 0.26rem;
	float:right;
	margin:0.3rem 0.3rem 0 0;
}
.todaynew{
	width:100%;
	background:#252528;
	text-align: left;
	overflow-y: auto;
	margin-bottom: 0.98rem;
}
.todaynew li{
	height:0.88rem;
	background:url(../assets/green.png) no-repeat 0.3rem center;
	background-size:0.12rem 0.12rem;
	border-bottom: 2px solid #2e2e32;
}
.todaynew li p{
	font:0.26rem/0.88rem "";
	color:#e6e6e6;
	margin-left:0.62rem;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
	width:6rem;
}
#j-carousel {
	height: 3.5rem;
}
#j-carousel img{
	height: 3.5rem;
}
</style>
<style>
	#j-carousel .ivu-carousel-dots li {
		border-radius: 50%;
	}
</style>