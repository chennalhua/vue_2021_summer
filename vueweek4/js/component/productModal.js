export default{
    props:['tempProduct','isAddPro'],
    template:`<div class="modal fade" id="proModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-xl">
        <div class="modal-content border-0">
            <div class="modal-header bg-info">
                <h5 class="modal-title text-light" id="exampleModalLabel">{{isAddPro?'新增產品':'編輯產品'}}</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <div class="row">
                    <div class="col-4">
                        <div class="form-group mb-2">
                            <label for="mainImg" class="form-label">主要圖片</label>
                            <input type="text" class="form-control" id="mainImg" v-model="tempProduct.imageUrl">
                            <img class="img-fluid" :src="tempProduct.imageUrl">
                        </div>
                        <div>
                            <p class="mb-1">多圖新增</p>
                            <div v-if="Array.isArray(tempProduct.imagesUrl)"> <!--Array.isArray 判斷是否為陣列-->
                                <div class="mb-1" v-for="(item,index) in tempProduct.imagesUrl" :key="index">
                                    <div class="form-group">
                                        <label for="imagesUrl">圖片網址</label>
                                        <input type="text" class="form-control" placeholder="請輸入圖片連結" v-model="tempProduct.imagesUrl[index]">
                                    </div>
                                    <img class="img-fluid" :src="item">
                                </div>
                                <div v-if="!tempProduct.imagesUrl.length || tempProduct.imagesUrl[tempProduct.imagesUrl.length - 1]">
                                    <button class="btn btn-outline-info d-block w-100" @click="tempProduct.imagesUrl.push('')">新增圖片</button>
                                </div>
                                <div v-else>
                                    <button class="btn btn-outline-danger d-block w-100" @click="tempProduct.imagesUrl.pop()">刪除圖片</button>
                                </div>
                            </div>
                            <div v-else>
                                <button class="btn btn-outline-info d-block w-100" @click="createImages">新增圖片</button>
                            </div>
                        </div>
                    </div>
                    <div class="col-8">
                        <div class="mb-2 form-group">
                            <label for="proTitle" class="form-label">標題</label>
                            <input type="text" class="form-control" id="proTitle" v-model="tempProduct.title">
                        </div>
                        <div class="row">
                            <div class="form-group col-6 mb-2">
                                <label for="proCategory" class="form-label">分類</label>
                                <input type="text" class="form-control" id="proCategory" v-model="tempProduct.category">
                            </div>
                            <div class="form-group col-6 mb-2">
                                <label for="proUnit" class="form-label">單位</label>
                                <input type="text" class="form-control" id="proUnit" v-model="tempProduct.unit">
                            </div>
                        </div>
                        <div class="row">
                            <div class="form-group col-6 mb-2">
                                <label for="proOriginPrice" class="form-label">原價</label>
                                <input type="number" class="form-control" id="proOriginPrice" v-model.number="tempProduct.origin_price" min="0">
                            </div>
                            <div class="form-group col-6 mb-2">
                                <label for="proPrice" class="form-label">售價</label>
                                <input type="number" class="form-control" id="proPrice" v-model.number="tempProduct.price" min="0">
                            </div>
                        </div>
                        <hr>
                        <div class="mb-2 form-group">
                            <label for="proDes" class="form-label">產品描述</label>
                            <textarea class="form-control" name="產品描述" id="proDes" v-model="tempProduct.description"></textarea>
                        </div>
                        <div class="mb-2 form-group">
                            <label for="proContent" class="form-label">產品內容</label>
                            <textarea class="form-control" name="產品內容" id="proContent" v-model="tempProduct.content"></textarea>
                        </div>
                        <div class="form-check">
                            <input id="isEnabled" v-model="tempProduct.is_enabled" class="form-check-input checked" type="checkbox" :true-value="1" :false-value="0">
                            <label class="form-check-label" for="isEnabled">是否啟用</label>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-outline-secondary" @click="$emit('close-modal')">關閉</button>
                <button type="button" class="btn btn-info text-light" @click="$emit('update-product',tempProduct)">{{isAddPro?'建立':'確認編輯'}}</button>
            </div>
        </div>
    </div>
</div>`,
    methods:{
        createImages(){
            this.tempProduct.imagesUrl = [];
            this.tempProduct.imagesUrl.push('');
        },
    }
}