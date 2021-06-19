import productList from "./component/productList.js";
import productInfoModal from "./component/productInfoModal.js";

const apiUrl= 'https://vue3-course-api.hexschool.io';
const apiPath='vip899629';

let InfoModal = '';

const app = Vue.createApp({
    data(){
        return{
            productsData:[], //產品資料
            product:[], //單一產品資料
            loadingStatus:{
                loadingPage:true,
                loadingItem:''
            }//讀取效果
        }
    },
    components:{
        productList,
        productInfoModal
    },
    methods:{
        getProducts(){
            axios.get(`${apiUrl}/api/${apiPath}/products`)
            .then((res) => {
                this.productsData = res.data.products;
                this.loadingStatus.loadingPage = false
            })
            .catch((err) => {
                console.log(err)
            })
        },
        clickModal(item){
            this.loadingStatus.loadingItem = item.title
            axios.get(`${apiUrl}/api/${apiPath}/product/${item.id}`)
            .then((res) => {
                this.product = res.data.product;
                if(res.data.success){
                    InfoModal.show();
                    this.loadingStatus.loadingItem = '';
                }
            })
            .catch((err) => {
                console.log(err)
            })
        },
        addCart(id, qty=1){ //qty=1 預設數量為 1
            this.loadingStatus.loadingItem = id
            axios.post(`${apiUrl}/api/${apiPath}/cart`,{
                "data": {
                    "product_id":id,
                    "qty":qty 
                } 
            })
            .then(res => {
                if(res.data.success){
                    alert(res.data.message)
                    this.loadingStatus.loadingItem = ''; //取得後清空
                }
            })
            .catch(err => {
                console.log(err)
            })
        }
    },
    mounted(){
        InfoModal = new bootstrap.Modal(document.querySelector('#productInfoModal'));
        this.getProducts();
    }
});
app.mount('#app');