# hex_vueweek4
https://chennalhua.github.io/vue_2021_summer/vueweek4/index.html

### 修正
- apiUrl 和 apiPath 不建議放在 data 內，可以放在全域，因為這個資料不會修改也不會在畫面上使用
- ProModal 可以改用小駝峰命名，較有一致性
- 原價／售價 input 記得加上 min=0 否則可以選擇負的數值
- alert(res.data.success.message) 回傳內容要改成 res.data.message 才是正確的
- 因為有多張圖片，編輯產品時 tempProduct 就會有兩層物件，可以改為深層拷貝將第二層的物件也一併複製，避免動到原本的資料（目前在編輯「已有多圖」的產品 Modal 新增一張多圖，接著按「取消」關閉 Modal，下次再打開同個產品 Modal 時會發現那張圖還在
- 分頁 a 連結 click 時需加上 .prevent 阻止預設行為
