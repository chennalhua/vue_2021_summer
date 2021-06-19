const apiUrl= 'https://vue3-course-api.hexschool.io';
const apiPath='vip899629';

const app = Vue.createApp({
    data(){
        return{
            cartProductData:[],
            form:{
                user:{
                    name:'',
                    email:'',
                    tel:'',
                    address:'',
                },
                message:''
            },
            loadingStatus:{
                loadingPage:true,
            }//讀取效果
        }
    },
    methods: {
        getCartProduct(){
            axios.get(`${apiUrl}/api/${apiPath}/cart`)
            .then(res => {
                console.log(res.data.data);
                if(res.data.success){
                    this.cartProductData = res.data.data;
                    this.loadingStatus.loadingPage = false
                    
                }
            })
            .catch(err =>{
                console.log(err)
            })
        },
        updateCart(id,qty){
            if(qty > 0){
                axios.put(`${apiUrl}/api/${apiPath}/cart/${id}`,{
                    "data": { 
                        "product_id":id,
                        "qty":qty
                    }
                })
                .then(res => {
                    console.log(res);
                    this.getCartProduct();
                })
            }else{
                this.delSingleCart(id)
            }
        },
        delSingleCart(id){
            axios.delete(`${apiUrl}/api/${apiPath}/cart/${id}`)
            .then(res => {
                if(res.data.success){
                    alert('已刪除產品');
                    this.getCartProduct()
                }
            })
            .catch(err => {
                console.log(err)
            })
        },
        delAllCart(){
            axios.delete(`${apiUrl}/api/${apiPath}/carts`)
            .then(res => {
                if(res.data.success){
                    alert('已刪除全部商品');
                    this.getCartProduct()
                }
            })
            .catch(err => {
                console.log(err)
            })
        },
        checkoutOrder(){
            axios.post(`${apiUrl}/api/${apiPath}/order`,{
                "data": {
                    "user": {
                      "name": this.form.user.name,
                      "email": this.form.user.email,
                      "tel": this.form.user.tel,
                      "address": this.form.user.address
                    },
                    "message": this.form.message
                }
            })
            .then(res => {
                if(res.data.success){
                    alert('建立訂單成功！！');
                    this.loadingStatus.loadingPage = true;
                    this.getCartProduct();
                    this.$refs.formDom.resetForm();
                    this.form.message = '';
                }
            })
            .catch(err => {
                console.log(err)
            })
        },
        isPhone(value) {
            const phoneNumber = /^(09)[0-9]{8}$/
            return phoneNumber.test(value) ? true : '請填入正確的電話號碼'
        }
    },
    mounted(){
        this.getCartProduct()
    }
});
//VeeValidate

//加入多國語系
VeeValidateI18n.loadLocaleFromURL('js/zh_TW.json');
VeeValidate.configure({ // Activate the locale
    generateMessage: VeeValidateI18n.localize('zh_TW'),
  validateOnInput: true, // 調整為輸入字元立即進行驗證
});

Object.keys(VeeValidateRules).forEach(rule => {
    if (rule !== 'default') {
      VeeValidate.defineRule(rule, VeeValidateRules[rule]);
    }
});

app.component('VForm', VeeValidate.Form);
app.component('VField', VeeValidate.Field);
app.component('ErrorMessage', VeeValidate.ErrorMessage);
//VeeValidate

app.mount('#app');