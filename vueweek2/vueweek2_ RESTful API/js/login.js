//dom
const userNameInput = document.querySelector('#userName');
const userPasswordInput = document.querySelector('#userPassword');
const loginBtn = document.querySelector('#loginBtn');
const form = document.querySelector('form');

loginBtn.addEventListener('click',login);
function login(){
    const username = userNameInput.value;
    const password = userPasswordInput.value;

    const user = {
        username,
        password
    }
    console.log(user);
    //axios 登入要傳送資料到後台 post
    axios.post(`${url}admin/signin`, user)
    .then((response) => {
        console.log(response);
        if(response.data.message === '登入成功'){
            alert('登入成功！！歡迎你～');
            //儲存 cookie
            const token = response.data.token;
            const expired = response.data.expired;
            //將 cookie 存入瀏覽器 //new Date(expired) 轉為日期格式
            document.cookie = `MyToken=${token}; expires=${new Date(expired)}`
            window.location = 'backstage.html'; //頁面導向
        }else{
            alert('帳號或密碼錯誤！請重新輸入');
            form.reset();
            return
        }
    })
    .catch((err) => {
        console.log(err);
    })
}