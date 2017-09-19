<template>
	<div id="placeorder">
		<h3 class="header"><span class="back" @click="back"></span>挂单</h3>
		<div class="main">
			<Form ref="form" :model="orders" class="formAll">
				<FormItem class="label" label="股票名称或代码：" prop="a" :rules="[
	              { required: true, message: '股票名称或代码不能为空', trigger: 'change' }
	            ]">
		            <Input class="form_inp" v-model="orders.a" placeholder=""></Input>
		       </FormItem>
		        
		        <FormItem class="label" label="买入手数：" prop="b" :rules="[
	              { required: true, message: '买入手数不能为空', trigger: 'change' }
	            ]">
		            <Input class="form_inp" v-model="orders.b" placeholder=""  @input="handleIn"></Input>
		        </FormItem>
		        
		        <FormItem class="label" label="行权时间：" prop="c" :rules="[
	               { required: true, message: '行权时间不能为空', trigger: 'change' }
	            ]">
		             <Select v-model="orders.c" placeholder="请选择" class="form_inp" @input="handleSel">
				        <Option v-for="item in xingquan" :value="item.tscId" :key="item.value">{{item.tscContent}}({{item.tscPid}})</Option>
				    </Select>
		        </FormItem>
		        
		        <FormItem class="label" label="权利金利率：" prop="d" :rules="[
	              { required: false, message: '权利金利率不能为空', trigger: 'blur',disabled:'true' }
	            ]">
		            <Input class="form_inp" v-model="orders.d" placeholder="" @input="handleIn" disabled></Input>
		            <p class="quanlijin">权利金利率*加权倍数=实际权利金利率</p>
		        </FormItem> 
		        
		        <FormItem class="label" label="下单方式：" prop="e" :rules="[
	               { required: true, message: '请选择下单方式', trigger: 'change' }
	            ]">
		             <Select v-model="orders.e" placeholder="请选择" class="form_inp" @input="handleWay">
				        <Option v-for="item in xiadan" :value="item.value" :key="item.value">{{ item.label }}</Option>
				    </Select>
		        </FormItem>
		        
		        <FormItem class="label" label="挂单价格：" prop="f" :rules="[
	              { required: true, message: '挂单价格不能为空', trigger: 'change' }
	            ]">
		            <Input class="form_inp placeorderpay" v-model="orders.f" placeholder="" @input="handleIn"></Input>
		        </FormItem>
		         
		        <FormItem class="label" label="加权：" prop="g" :rules="[
	              { required: true, message: '请输入最少为1最大为10的整数', trigger: 'change' }]">
		             <!--<Select v-model="orders.f" placeholder="请输入至少为1的整数" class="form_inp">
				        <Option v-for="(item, index) in cityList" :value="item.value" :key="item.index">
				        	{{ item.label }}
				        </Option>
				    </Select>-->
				    <Input class="form_inp" v-model="orders.g" placeholder="请输入1-10的整数" @input="handleIn"></Input>
		        </FormItem>
		        <!--<FormItem class="label" label="备注：" prop="f">
		          <Input class="form_inp textarea" v-model="orders.f" type="textarea" placeholder=""></Input>
		        </FormItem>-->
		        <div class="Kim">
			   		<p class="inKim">投资金额：<span>{{inKim}}</span>元</p><p class="enKim">权利金：<span>{{enKim}}</span>元</p>
			   </div>
		   </Form>
		   <div class="up">
		   		<Button type="success" @click="handleSubmit" class="success">确认</Button>
		   </div>
	        <div class="win" ref="win" @click="cancelwin">
		       	<div>
		       		<p>恭喜！挂单成功！</p>
		       		<button @click="backoptional">回到自选</button>
		       	</div>		
		    </div>
	    </div>
	</div>
</template>

<script>
    export default {
        data () {
            return {
                orders: {
                	d:'',
                	c:'',
                	g:'1'
                },
                xiadan: [
                	{label: '最新价', value: '0'},
                	{label: '均价', value: '1'}
                ],
                xingquan:[],
                inKim:'',
                enKim:'',
                centerId:'',
                userNumber:''
            }
        },
        mounted:function(){
        	this.centerId = this.$getUrl().centerId
        	this.userNumber = this.$getUrl().userNumber
        	var gpid = this.$route.query.stockid
        	this.orders.a = gpid
        	var that = this 
        	ajax({
        		url:''+host+'/order/getCycle',
        		type:'POST',
        		data:JSON.stringify({
				    "userNumber" : that.userNumber
				}),
				success:function(res){
					res.resultList.forEach(x => {
						x.tscId = String(x.tscId)
					})
					that.xingquan = res.resultList
//					let tarGetObj = this.xingquan.filter(x => x.tscID = this.orders.c)
//              	console.log(tarGetObj)

//					that.xingquan = res.resultList			
				}
        	})
        	ajax({
        		url:''+host+'/stock/detail',
        		type:'POST',
        		data:JSON.stringify({
				    "stockId" : gpid
				}),
				success:function(info){
					console.log(info)
					var rebate = String(info.stock.rebate)
					that.orders.d = rebate
					window.sessionStorage.setItem("d",rebate)
//					console.log(that.orders.d)
				}
        	})
        },
        methods: {
        	back:function(){
        		var gpid = this.$route.query.stockid
				this.$router.push({path:'/gpkk',query:{stockId:gpid}})
			},
            handleSubmit () {
            	var gpid = this.$route.query.stockid
//          	console.log(this.$refs.form)
                this.$refs.form.validate((valid) => {
                    if (valid) {               	
//                  	console.log(this.orders)
                    	let val = Number(this.orders.g)
//                  	console.log(val)
                    	if (val<1 || val>10 || val % 1 !== 0 ) {
                    		this.$Message.error('加权倍数只能为1-10的整数');
                    		return false
                    	}
//                  	console.log(this.orders)
						var that = this
						var gpId = Number(gpid)
						var xingquanVal = window.sessionStorage.getItem("xingquanVal")
						var way = window.sessionStorage.getItem("way")
						var b = Number(that.orders.b)
						var f = Number(that.orders.f)
						var val = Number(xingquanVal)
						var enKim = Number(that.enKim)
						var d = Number(that.orders.d)
						var g = Number(that.orders.g)
                    	ajax({
							url:''+host+'order/createOrder',
							type:'POST',
							data:JSON.stringify({
							    "userNumber" : that.userNumber,
							    "order" : {
							        "toiStockId" : gpid,
							        "toiNum" : b,
							        "toiExpectPoint" : f,
							        "toiType" : 2,
							        "toiCycle" : val,
							        "toiOptionMoney" : enKim,
							        "toiRate" : d,
							        "toiMethodType" : way,
							        "toiWeightNum" : g,
							        "toiCenterId": that.centerId
							    }
							}),
							success:function(res){
								console.log(res)
								var code = res.code
								if(code === 100){
//									that.$Message.success('提交成功!');
									that.$refs.win.style.display = "block"
								}else if(code === 101){
									that.$Message.error('表单信息或网络错误！')
								}else if(code === 503){
									that.$Message.error('余额不足！')
								}		
							}
                   		})   
                    } else {
                        this.$Message.error('表单验证失败!');
                    }
                })
            },
            handleIn () {
        		let isSum = !isNaN(this.orders.b) && !isNaN(this.orders.f) && !isNaN(this.orders.g)
        		if(isSum){
        			this.inKim = this.orders.b*this.orders.f*this.orders.g
        		}
//      		console.log(this.orders.d*this.orders.g)
        		if(this.orders.g != ''&&this.orders.d != ''){
        			var dnum = this.orders.d*this.orders.g
        			this.orders.d = dnum.toFixed(2)
        		}else if(typeof this.orders.d === NaN||this.orders.g==''){
        			this.orders.d = window.sessionStorage.getItem("d")
        		}
        		var tscPid = window.sessionStorage.getItem("tscpid")
//      		console.log(this.orders.b*tscPid*this.orders.d*this.orders.f*this.orders.g)
        		if(this.orders.b!=undefined&&this.orders.d!=undefined&&this.orders.f!=undefined&&this.orders.g!=undefined){
					var ennum = this.orders.b*tscPid*this.orders.d/100*this.orders.f*this.orders.g
					this.enKim = ennum.toFixed(2)
				}else{
					this.enKim = ""
				}
        	},
        	handleSel(){
        		let tarGetObj = this.xingquan.filter(x => x.tscId == this.orders.c)
                window.sessionStorage.setItem("tscpid",tarGetObj[0].tscPid)
                window.sessionStorage.setItem("xingquanVal",tarGetObj[0].tscValue)
        	},
        	handleWay(){
        		window.sessionStorage.setItem("way",this.orders.e)
        	},
        	backoptional(){
        		this.$router.push({path:'/optional'})
        	},
        	cancelwin(){
        		this.$refs.win.style.display = "none"
        	}
        }
    }
</script>

<style scoped>
	
</style>
<style>
	#placeorder{
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
	#placeorder .main{
		width:100%;
		height:100%;
		background:#252528;
	}
	#placeorder .formAll{
		margin-top:0.4rem;
		background:#252528;
	}
	#placeorder .formAll .label{
		height:0.66rem;
	}
	#placeorder .formAll .label .textarea{
		width:6.3rem;
		height:1.8rem;
		margin-left:0.3rem;
		display: block;
		font-size:0.24rem;
		color:#666;
	}
	#placeorder .ivu-form{
		text-align: left;
	}
	.ivu-form-item .ivu-form-item .ivu-form-item-content{
		width:0;
	}
	.ivu-form-item .ivu-form-item .ivu-form-item-content .ivu-date-picker{
		width:3.6rem;
	}
	#placeorder .ivu-form .ivu-form-item-label{
		text-align: left;
		font-size:0.28rem;
		color:#fff;
		width:2.7rem;
		margin-left:0.3rem;
	}
	#placeorder .ivu-form-item-error-tip{
		width:2.7rem;
		margin-left:0.3rem;
		padding-top:0;
	}
	#placeorder .form_inp{
		width:3.6rem;
		height:0.66rem;
		font-size:0.24rem;
		color:#666;
	}
	#placeorder .placeorderpay .ivu-input{
		color:#fd4331;
	}
	#placeorder .ivu-input{
		background:#252528;
		border:2px solid #fff;
		font-size:0.24rem;
		color:#666;
	}
	#placeorder .ivu-select-single .ivu-select-selection{
		background:#252528;
		border:2px solid #fff;
	}
	#placeorder .ivu-icon-ios-calendar-outline:before {
		/*background: red;*/
	}
	#placeorder .Kim{
		height:0.88rem;
		background:#252528;
		display: flex;
		flex-wrap: nowrap;
		justify-content:space-between;
	}
	#placeorder .inKim,.enKim{
		font-size:0.28rem;
		color:#fff;
		text-align: left;
	}
	#placeorder .inKim{
		margin-left:0.3rem;
	}
	#placeorder .enKim{
		margin-right:0.3rem;
	}
	#placeorder .inKim span,.enKim span{
		color:#fd4331;
	}
	#placeorder .main .up{
		background:#252528;
	}
	#placeorder .success{
		width:4.5rem;
		height:0.88rem;
		font-size:0.3rem;
		color:#fff;
		background:#fd4331;
		border:0;
		margin-top:0.7rem;
	}
	#placeorder .formAll .label .quanlijin{
		height:0.3rem;
		font-size:0.22rem;
		color:#bbbec4;
		text-align:right;
		/*margin-right:0.9rem;*/
		width:95%;
	}
	#placeorder .win{
		position: fixed;
		left:0;
		top:0;
		width:100%;
		height:100%;
		background:rgba(0,0,0,0.6);
		z-index: 5;
		display: none;
	}
	#placeorder .win div{
		position: fixed;
		left:0;
		top:0;
		right:0;
		bottom:0;
		margin:auto;
		border-radius: 0.1rem;
		width:4rem;
		height:2rem;
		z-index: 6;
		background:#fff;
	}
	#placeorder .win p{
		height:0.5rem;
		font:0.3rem/1rem "";
		color:#000;
	}
	#placeorder .win button{
		width:2.4rem;
		height:0.8rem;
		outline: none;
		background:#fd4331;
		font-size:0.26rem;
		color:#fff;
		border:0;
		border-radius: 0.06rem;
		margin-top:0.5rem;
	}
</style>