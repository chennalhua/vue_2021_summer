## vue_week4 (後台頁面)
https://chennalhua.github.io/vue_2021_summer/vueweek4/index.html

### 完成
- 登入頁面
  * 登入傳接 API
- 後台產品頁面
  * 取得、新增、刪除、編輯產品資料傳接 API
  #### 元件化（prop、emit 資料傳遞）
  * 使用 import module 來引入元件
  * 後台頁面 Modal 
  * 分頁

### 修正
- apiUrl 和 apiPath 放在全域，不建議放在 data 內，因為這個資料不會修改也不會在畫面上使用
- 原價／售價 input 加上 min="1" 否則可以選擇負的數值
- 有多張圖片，編輯產品時 tempProduct 就會有兩層物件，改為「深層拷貝」將第二層的物件也一併複製，避免動到原本的資料（目前在編輯「已有多圖」的產品 Modal 新增一張多圖，接著按「取消」關閉 Modal，下次再打開同個產品 Modal 時會發現那張圖還在
- 分頁 a 連結 click 時加上 .prevent 阻止預設行為
