new Vue({
	el:'.container',
	data:{
		limitNum:3,
		addressList:[],
		currentIndex:0,
		shippingMethods: 2
	},
	mounted:function(){
		this.$nextTick(function(){
			this.getAddressList()
		})
	},
	computed:{
		filterAddress(){
			return this.addressList.slice(0, this.limitNum)
		}
	},
	methods:{
		getAddressList(){
			this.$http.get("data/address.json").then((response)=>{
				var res = response.data;
				if (res.status == '0') {
					this.addressList = res.result;
				}
			})
			
		},
		loadMore(){
			this.limitNum = this.addressList.length;
		},
		setDefault(addressId){
			this.addressList.forEach(function(address, index){
				if (address.addressId == addressId) {
					address.isDefault = true
				}else{
					address.isDefault = false
				}
			})
		}
	}
})