//建立 proData
let proData = [
    {
        id:Math.floor(Date.now()),
        proName:'小米甜甜圈',
        proOriginalPrice:30,
        proSellingPrice:25,
        isEnable:true
    },
];


//dom
/*新增產品區*/
const proAddBtn = document.querySelector('#proAddBtn');
const form = document.querySelector('form');
/*產品列區*/
const proList = document.querySelector('#proList');
const delSingleBtn = document.querySelector('#delSingleBtn');
const delAllBtn = document.querySelector('#delAllBtn');

//監聽
proAddBtn.addEventListener('click',proAdd);
proList.addEventListener('click',proListDoSomething);
delAllBtn.addEventListener('click',delAllPro);

//初始化
function init(){
    render(proData);
}
init();

//資料處理
/*建立新產品*/
function proAdd(){
    //dom
    const proNameInput = document.querySelector('#proName').value.trim();
    const proOriginalPriceInput = document.querySelector('#proOriginalPrice').value.trim();
    const proSellingPriceInput = document.querySelector('#proSellingPrice').value.trim();
    const proNum = document.querySelector('#proNum');
    
    //驗證
    if(proNameInput == ''){
        swal({
            title: "請確實填寫產品名稱",
            icon: "error",
            button: "重新填寫",
        });
        return
    }else if(proOriginalPriceInput == '' || proOriginalPriceInput == 0){
        swal({
            title: "請確實填寫產品原價",
            icon: "error",
            button: "重新填寫",
        });
        return
    }else if(proSellingPriceInput == '' || proSellingPriceInput == 0){
        swal({
            title: "請確實填寫產品售價",
            icon: "error",
            button: "重新填寫",
        });
        return
    }
    //推送資料
    let newProData = {
        id:Math.floor(Date.now()),
        proName:proNameInput,
        proOriginalPrice:parseInt(proOriginalPriceInput),
        proSellingPrice:parseInt(proSellingPriceInput),
        isEnable:false
    }
    proData.push(newProData);
    //新增成功
    swal({
        title: "新增成功!",
        text: "查看列表吧",
        icon: "success",
        button: "關閉",
    });
    form.reset(); //清除表單內容
    proNum.textContent = proData.length;
    render(newProData);
}

/*商品啟用狀態*/
function  enableState(id){
    proData.forEach(function(item){
        if(id == item.id){
            item.isEnable = !item.isEnable; //true = false; false = true
        }
    })
    render(proData);
}
/*刪除單一商品*/
function delSinglePro(id){
    let newIndex = 0;
    proData.forEach(function(item,index){
        if(id == item.id){
            newIndex = index;
        }
    })
    proData.splice(newIndex,1);
    render(proData);
}
/*狀態切換、單一刪除整合*/
function proListDoSomething(e){
    const action = e.target.dataset.action;
    const id = e.target.dataset.id;
    if(e.target.getAttribute('data-action')== null){
        return
    }
    if(action === 'state'){
        enableState(id);
    }else if(action === 'remove'){
        delSinglePro(id)
    }
}

/*刪除全部商品*/
function delAllPro(e){
    e.preventDefault();
    proData = [];
    render(proData)
}

//資料渲染
function render(data){
    let str = '';
    proData.forEach(function(item){
        content=`<tr>
        <td>${item.proName}</td>
        <td class="text-right">NT $${item.proOriginalPrice}</td>
        <td class="text-right">NT $${item.proSellingPrice}</td>
        <td class="text-center">
            <div class="custom-control custom-switch">
                <input type="checkbox" class="custom-control-input" id="${item.id}" ${item.isEnable? 'checked':''} data-id="${item.id}" data-action="state">
                <label class="custom-control-label" for="${item.id}" data-action="state" data-id="${item.id}">${item.isEnable? '啟用':'未啟用'}</label>
            </div>
        </td>
        <td class="text-center">
            <a href="#" class="text-info" id="delSingleBtn"><i class="fas fa-trash" data-action="remove" data-id="${item.id}"></i></a>
        </td>
    </tr>`;
        str+= content;
    });
    proList.innerHTML = str;
    proNum.textContent = proData.length;
}
