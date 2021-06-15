const form = document.querySelector('form');

const app = {
    data(){
        return{
            apiUrl: 'https://vue3-course-api.hexschool.io',
            apiPath:'vip899629',
            user:{
                username:'',
                password:''
            }
        }
    },
    methods: {
        login(){
            if(this.user.username === '' || this.user.password === ''){
                alert('請完整輸入帳號密碼！');
                return
            }
            axios.post(`${this.apiUrl}/admin/signin`,this.user)
            .then((res) => {
                if(res.data.success){
                    //儲存 cookie
                    const token = res.data.token;
                    const expired = res.data.expired;
                    document.cookie = `MyToken=${token}; expires=${new Date(expired)}`;
                    //
                    alert('登入成功！歡迎使用');
                    window.location = 'backstage.html';
                }else{
                    alert('帳號或密碼錯誤！請重新輸入');
                    this.user.username = '';
                    this.user.password = '';
                }
            })
            .catch((err) => {
                console.log(err);
            })
        }
    }
}
Vue.createApp(app).mount('#app');