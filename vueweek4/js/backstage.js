import pagination from './component/pagination.js';
import productModal from './component/productModal.js';
import deleteModal from './component/deleteModal.js';

const apiUrl= 'https://vue3-course-api.hexschool.io';
const apiPath='vip899629';


let proModal = '';
let delModal = '';

const app = Vue.createApp({
    data(){ 
        return{
            productData:[],
            isAddPro:false,
            tempProduct:{
                imagesUrl: [],
            },
            pagination:{}
        }
    },
    components:{
		pagination,
        productModal,
        deleteModal,
	},
    methods:{
        getProductData(page = 1){ //page 參數預設值
            axios.get(`${apiUrl}/api/${apiPath}/admin/products?page=${page}`)
            .then((res) => {
                if(res.data.success){
                    this.productData = res.data.products;
                    this.pagination = res.data.pagination;
                }else{
                    console.log(res.data.message);
                }
            })
            .catch((err) => {
                console.log(err)
            })
        },
        updateProduct(tempProduct){
            let api = `${apiUrl}/api/${apiPath}/admin/product`;
            let httpMethods = 'post';
            if(!this.isAddPro){
                api = `${apiUrl}/api/${apiPath}/admin/product/${this.tempProduct.id}`;
                httpMethods = 'put';
            }

            axios[httpMethods](api ,{data:tempProduct})
            .then((res) => {
                if(res.data.success){
                    alert(`已${this.isAddPro?'新增產品':'編輯產品'}內容`);
                    proModal.hide();
                    this.getProductData();
                    
                }else{
                    alert(res.data.message);
                }
            })
            .catch((err) => {
                console.log(err);
            })
        },
        delProduct(tempProduct){
            axios.delete(`${apiUrl}/api/${apiPath}/admin/product/${this.tempProduct.id}`)
            .then((res) => {
                if(res.data.success){
                    alert('已刪除此產品');
                    delModal.hide();
                    this.getProductData();
                }else{
                    alert(res.data.message)
                }
            })
            .catch((err) => {
                console.log(err);
            })
        },
        openModal(option,item){
            if(option === 'add'){
                this.tempProduct = {}
                this.isAddPro = true;
                proModal.show();
            }else if(option === 'edit'){
                this.tempProduct = JSON.parse(JSON.stringify(item)); //深拷貝
                this.isAddPro = false;
                proModal.show();
                console.log(this.tempProduct)
            }
            else if(option === 'delete'){
                this.tempProduct = {...item};
                delModal.show();
            }
        },
        closeModal(option){
            if(option === 'proClose'){
                proModal.hide();
            }else if(option === 'deleteClose'){
                delModal.hide();
            }
        },
    },
    mounted() {
        //token 
        const token = document.cookie.replace(/(?:(?:^|.*;\s*)MyToken\s*\=\s*([^;]*).*$)|^.*$/, "$1");
        if(!token){
            alert('您尚未登入，請重新登入！！');
            window.location = 'index.html';
        }
        //將 token 加到 headers 表頭裡 //因為預設將 token 存入 axios headers 所以只需設定一次就行
        axios.defaults.headers.common['Authorization'] = token; 

        proModal = new bootstrap.Modal(document.querySelector('#proModal'));
        delModal = new bootstrap.Modal(document.querySelector('#delProModal'));

        this.getProductData();
    }
});
app.mount('#app');
