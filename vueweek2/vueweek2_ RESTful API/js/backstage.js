const app = {
    el:{
        proList: document.querySelector('#proList'),
        proDataNum : document.querySelector('#proDataNum'),
        delAllBtn : document.querySelector('#delAllBtn'),
    },
    data:{
        proData : [],
    },
    //取產品列表
    getProList(){
        axios.get(`${url}api/${path}/products`) //請求
        .then((response) => { //回應
            if(response.data.success){
                this.data.proData = response.data.products;
                this.renderProList();
            }else{
                alert('請重新登入！');
                window.location = 'index.html';
            }
        })
        .catch((err) => {
            console.log(err); 
        })
    },
    //渲染
    renderProList(){
        // const proList = document.querySelector('#proList');
        // const proDataNum = document.querySelector('#proDataNum');
        let str = '';
        let enabledTrue = '';
        const proData = this.data.proData;
        proData.forEach((item) => {
            // if(item.is_enabled === 1){
            //     enabledTrue = '啟用'
            // }else{
            //     enabledTrue = '未啟用'
            // }
            str += `<tr>
            <td>${item.title}</td>
            <td class="text-right">NT $${item.origin_price}</td>
            <td class="text-right">NT $${item.price}</td>
            <td class="text-center">
            ${item.is_enabled? "啟用":"未啟用" }
            </td>
            <td class="text-center">
            <a href="#" class="text-info" id="delSingleBtn"><i class="fas fa-trash" data-action="remove" data-id="${item.id}"></i></a>
            </td>
        </tr>`;
        })
        this.el.proList.innerHTML = str;
        //標示有多少產品
        this.el.proDataNum.textContent = proData.length;

        const delSingleBtn = document.querySelectorAll('#delSingleBtn');
        delSingleBtn.forEach((item) => {
            item.addEventListener('click', this.delSinglePro);
            // item.addEventListener('click', this.delSinglePro.bind(this)); 強制綁定 this
        })
    },
    //刪除單一
    delSinglePro(e){
        const id = e.target.dataset.id;
        axios.delete(`${url}api/${path}/admin/product/${id}`)
        .then((response) => {
            if(response.data.success){
                alert('已刪除！！');
                app.getProList();
            }else{
                alert('驗證錯誤！請重新登入');
                window.location = 'index.html';
            }
        })
        .catch((err) => {
            console.log(err);
        })
    },
    //初始
    created(){
        //取得 token 
        getToken();
        this.getProList();
    }
}
app.created();