let ProModal = '';
let delModal = '';

const app = {
    data(){ 
        return{
            apiUrl: 'https://vue3-course-api.hexschool.io',
            apiPath:'vip899629',
            productData:[],
            isAddPro:false,
            tempProduct:{
                imagesUrl: [],
            },
        }
    },
    methods:{
        getProductData(){
            axios.get(`${this.apiUrl}/api/${this.apiPath}/admin/products`)
            .then((res) => {
                if(res.data.success){
                    this.productData = res.data.products;
                }else{
                    console.log(res.data.message);
                }
            })
            .catch((err) => {
                console.log(err)
            })
        },
        updateProduct(){
            let api = `${this.apiUrl}/api/${this.apiPath}/admin/product`;
            let httpMethods = 'post';
            if(!this.isAddPro){
                api = `${this.apiUrl}/api/${this.apiPath}/admin/product/${this.tempProduct.id}`;
                httpMethods = 'put';
            }

            axios[httpMethods](api ,{data:this.tempProduct})
            .then((res) => {
                if(res.data.success){
                    ProModal.hide();
                    this.getProductData();
                }else{
                    alert(res.data.success);
                }
            })
            .catch((err) => {
                console.log(err);
            })
        },
        delProduct(){
            axios.delete(`${this.apiUrl}/api/${this.apiPath}/admin/product/${this.tempProduct.id}`)
            .then((res) => {
                if(res.data.success){
                    delModal.hide();
                    this.getProductData();
                }else{
                    alert(res.data.success)
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
                ProModal.show();
            }else if(option === 'edit'){
                this.tempProduct = {...item};
                this.isAddPro = false;
                ProModal.show();
            }
            else if(option === 'delete'){
                this.tempProduct = {...item};
                delModal.show();
            }
        },
        closeModal(option){
            if(option === 'proClose'){
                ProModal.hide();
            }else if(option === 'deleteClose'){
                delModal.hide();
            }
        },
        createImages(){
            this.tempProduct.imagesUrl = [];
            this.tempProduct.imagesUrl.push('');
        }
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

        ProModal = new bootstrap.Modal(document.querySelector('#ProModal'));
        delModal = new bootstrap.Modal(document.querySelector('#delProModal'));

        this.getProductData();
    }
}
Vue.createApp(app).mount('#app');
