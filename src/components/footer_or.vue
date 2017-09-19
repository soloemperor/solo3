<template>
	<div id="footer">
		<ul class="bottom">
	    	<li @click="index"><span>首页</span></li>
	    	<li @click="optional"><span>自选</span></li>
	    	<li @click="market"><span>行情</span></li>
	    	<li @click="order"><span>订单</span></li>
	    </ul>
	</div>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  created:function(){
  	
  },
  mounted:function(){
  	
  },
  methods:{
  	index:function(){
  		this.$router.push({path:'/'});
  	},
  	optional:function(){
  		this.$router.push({path:'/optional'});
  	},
  	market:function(){
  		this.$router.push({path:'/market'});
  	},
  	order:function(){
  		this.$router.push({path:'/order'});
  	}
  }
}
</script>

<style scoped>
.bottom{
	width:100%;
	height:0.98rem;
	background:#2b2b30;
	position: fixed;
	left:0;
	bottom:0;
	z-index: 9;
	display: flex;
	flex-wrap: nowrap;
	justify-content: space-around;
}
.bottom li{
	width:25%;
}
.bottom li span{
	display: block;
	margin-top:0.65rem;
	font-size:12px;
	color:#808080;
}
.bottom li:nth-child(4) span{
	color:#d52424;
}
.bottom li:nth-child(1){
	background: url(../assets/home_1.png) no-repeat center 0.1rem;
	background-size:0.6rem 0.55rem;
}
.bottom li:nth-child(2){
	background: url(../assets/free.png) no-repeat center 0.1rem;
	background-size:0.6rem 0.55rem;
}
.bottom li:nth-child(3){
	background: url(../assets/market.png) no-repeat center 0.1rem;
	background-size:0.6rem 0.55rem;
}
.bottom li:nth-child(4){
	background: url(../assets/order_1.png) no-repeat center 0.1rem;
	background-size:0.6rem 0.55rem;
}
</style>