var vm = new Vue({
	el:'#app',
	data:{
		totalMoney:0,
		productList:[],
		checkAll:false,
		delFlag:false,
		curProduct:''
	},
	filters:{
		formatValue:function(value){
			return '￥ '+ value.toFixed(2);
		}	
	},
	mounted: function(){
		this.cartView()
	},
	methods:{
		cartView(){
			var _this = this;
			this.$http.get("data/cartData.json",{"id":123}).then((res)=>{
				_this.productList = res.data.result.list;
				// this.totalMoney = res.data.result.totalMoney;
			})
		},
		changeMoney(count,way){
			if (way>0) {
				count.productQuantity++
			}else{
				count.productQuantity--
				if (count.productQuantity < 1) {
					count.productQuantity = 1
				}
			}
			this.calcTotalPrice()
		},
		selectedProduct(item){
			if (typeof item.checked == "undefined") {
				this.$set(item,"checked",true)
				// Vue.set(item,"checked",true)
			}else{
				item.checked = !item.checked;
			}
			this.calcTotalPrice()
		},
		checkAllClick(flag) {
			this.checkAll = flag;
			var _this = this;
			this.productList.forEach(function(item,index){
				if (typeof item.checked == "undefined") {
					_this.$set(item,"checked", _this.checkAll)
				}else{
					item.checked = _this.checkAll
				}
			})
			this.calcTotalPrice()

		},
		calcTotalPrice:function(){
			this.totalMoney = 0;
			var _this = this;
			this.productList.forEach(function(item,index){
				if (item.checked) {
					_this.totalMoney += item.productPrice * item.productQuantity
				}
			})
		},
		delConfirm:function(item){
			this.delFlag = true
			this.curProduct = item
		},
		delProduct:function(){
			var index = this.productList.indexOf(this.curProduct)
			this.productList.splice(index,1)
			this.delFlag = false
			
		}
	}
})
