const url = 'https://vue3-course-api.hexschool.io/';
const path = 'vip899629'

// ＊＊token 整個站點只需要設定一次 ＊＊
function getToken(){
    //取得 token 
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)MyToken\s*\=\s*([^;]*).*$)|^.*$/, "$1");
    //將 token 加到 headers 表頭裡
    axios.defaults.headers.common['Authorization'] = token;
}